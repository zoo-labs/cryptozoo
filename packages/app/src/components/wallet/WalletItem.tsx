import React from "react";
import { FaHeart, FaMoneyBill, FaMoneyBillWave } from "react-icons/fa";
import { accountEllipsis, getEmoji } from "functions";
import dynamic from "next/dynamic";
import moment from "moment";
import { MyNFT } from "state/zoo/types";
const ModelViewer = dynamic(() => import("../../components/ModelViewer"), {
  ssr: false,
});

interface IndexProps {
  datum: MyNFT;
  onClick: () => void;
}

const Index: React.FC<IndexProps> = ({ datum, onClick }) => {
  console.log("DATAUM", datum);
  return (
    <div
      className="flex flex-col w-full md:w-[32%] lg:w-[24%]"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded bg-nft-gradient p-[2px] parent w-full">
        <div className="h-[450px] w-full">
          {datum.kind === 0 || datum.kind === 2 ? (
            <video
              autoPlay
              loop
              src={datum.token_uri}
              width={"100%"}
              height={"100%"}
              className="rounded overflow-hidden max-h-[450px] object-cover"
            />
          ) : (
            <div className="h-[450px] w-[300px]">
              <ModelViewer
                glb={datum?.glb_animation_url}
                usdz={datum?.usdz_animation_url}
              ></ModelViewer>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-grow py-4 no-underline cursor-pointer">
        <div className="flex flex-col flex-grow">
          <div className="flex mb-4 ">
            <div className="mt-1 mr-auto font-semibold">
              {datum.name?.toUpperCase()} {datum.kind >= 2 && "(Hybrid)"}{" "}
              <span className="text-xs text-gray-500">({datum.id || ""})</span>
            </div>
          </div>
          <div className="flex ">
            <div className="flex mt-1 mr-auto text-xs font-semibold text-gray-500">
              <div className="w-4 h-4 mr-1 rounded-full bg-gradient-to-b from-btn1 to-btn2" />
              {"Date"}
            </div>
            <div className="flex items-center justify-center flex-shrink-0 ml-2 text-xs font-bold uppercase rounded-sm">
              {moment(new Date(datum.timestamp * 1000), "YYYYMMDD").fromNow()}
            </div>
          </div>
        </div>
        {datum.attributes &&
          typeof datum.attributes === "object" &&
          datum.attributes.map((attr, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between pt-4 mt-4 text-sm text-gray-800 border-t border-gray-700 border-solid "
              >
                <div className="flex items-center text-xs font-semibold text-gray-500">
                  <div className="mr-1">
                    <FaHeart />
                  </div>
                  {attr.trait_type}
                </div>
                <div className="text-xs font-semibold text-gray-500">
                  {attr.value}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Index;