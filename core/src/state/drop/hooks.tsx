import axios from "axios";
import { abis } from "../../constants";
import { getContract } from "functions";
import { useActiveWeb3React, useDrop, useZooKeeper } from "hooks";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEgg } from "state/zoo/actions";
import { AvailableEgg, Drop } from "types";
import { useGetAvailableEggs } from "../zoo/hooks";
import { addDrops } from "./action";
import { convertIpfsUrl } from "../../entities/index";

export const getMetaData = async (metadataURI, from?) => {
  const uri = convertIpfsUrl(metadataURI);
  try {
    const res = await axios.get(uri, {
      headers: {
        Accept: "text/plain",
      },
    });
    // console.log("getting data 2", res.data);
    return res.data;
  } catch (err) {
    console.log("getting data error", err, "from", from, "uri", metadataURI);
  }
};

export function useGetDrops() {
  const dispatch = useDispatch();
  const zooKeeper = useZooKeeper();
  const { library, chainId } = useActiveWeb3React();

  return useCallback(async () => {
    const drops = await [...Array(zooKeeper.dropIDs()).keys()]?.map(
      async (dropId, index) => {
        const dropAddress = await zooKeeper.drops(dropId + 1);
        const dropC = getContract(
          dropAddress,
          abis[chainId.toString()]["Drop"],
          library,
          undefined
        );
        const dropTitle = await dropC.title();
        const totalSupply = await dropC?.totalSupply();
        const eggs: Array<any> = await dropC?.getAllEggs();
        console.log("eggs", eggs);
        const { image, description } = await dropC.dropInformation(dropTitle);
        const eggsPromise = await eggs
          .filter((eggData) => eggData.exist)
          .map(async (egg) => {
            const data = await getMetaData(egg.data.metadataURI);

            const { name, description, attributes, image, animation_url } =
              data;
            const finalEgg: AvailableEgg = {
              bidShares: {
                creator: Number(egg?.bidShares?.creator),
                owner: Number(egg?.bidShares?.owner),
                prevOwner: Number(egg?.bidShares?.prevOwner),
              },
              birthday: Number(egg.birthday),
              exist: egg?.exist,
              id: Number(egg.id),
              kind: egg.kind,
              minted: Number(egg.minted),
              name: egg.name,
              description,
              price: Number(egg.price),
              supply: Number(egg.supply),
              timestamp: Number(egg.timestamp),
              image: `https://zoolabs.mypinata.cloud/ipfs/${image?.slice(7)}`,
              animation_url: `https://zoolabs.mypinata.cloud/ipfs/${animation_url?.slice(
                7
              )}`,
              attributes,
            };
            return finalEgg;
          });
        const dropPromise = await Promise.all(eggsPromise)
          .then((eggs) => {
            const newDrop: Drop = {
              title: dropTitle,
              description,
              image,
              items: eggs,
              supply: eggs.reduce((a, b) => a + b.supply, 0),
              minted: eggs.reduce((a, b) => a + b.minted, 0),
              dropSupply: eggs.length,
              dropId: 1,
            };
            return newDrop;
          })
          .catch((err) => console.error("mi_egg_promiseerror", err));
        return dropPromise;
      }
    );
    await Promise.all(drops)
      .then((drop: Drop[]) => {
        dispatch(addDrops(drop));
      })
      .catch((err) => console.error("mi_egg_promiseerror", err));
  }, [dispatch, library, zooKeeper]);
}