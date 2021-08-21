import { deployments, ethers, getNamedAccounts } from 'hardhat'

// import { ZooKeeper__factory, ZooMedia__factory, ZooMarket__factory, Token, ZooDrop } from '../types';

// import { ZooMedia } from '../types/ZooMedia';
// import { ZooToken } from '../types/ZooToken';
// import { ZooFaucet } from '../types/ZooFaucet';
// import { ZooMarket } from '../types/ZooMarket';
// import { ZooKeeper } from '../types/ZooKeeper';
import chai, { expect } from 'chai'
// import configureGame from '../utils/configureGame';
import { BigNumber, Bytes, BytesLike, utils } from 'ethers'

import { solidity } from 'ethereum-waffle'
import '@nomiclabs/hardhat-ethers'
import { hex } from 'chalk'

chai.use(solidity)

let zooToken: any
let zooDrop: any
let zooMarket: any
let zooKeeper: any
let zooMedia: any
let signers: any
let mintAmt = 100000000
let owner
let mediaAddress: string
let marketAddress: string
let eggPrice: any

const setupTest = deployments.createFixture(async ({ deployments, getNamedAccounts, ethers }, options) => {
  const contracts = await deployments.fixture() // ensure you start from a fresh deployments

  signers = await ethers.getSigners()

  zooToken = await ethers.getContractAt('ZooToken', contracts.ZooToken.address, signers[0])

  zooMarket = await ethers.getContractAt('ZooMarket', contracts.ZooMarket.address, signers[0])

  zooMedia = await ethers.getContractAt('ZooMedia', contracts.ZooMedia.address, signers[0])

  zooKeeper = await ethers.getContractAt('ZooKeeper', contracts.ZooKeeper.address, signers[0])

  zooDrop = await ethers.getContractAt('ZooDrop', contracts.ZooDrop.address, signers[0])

  // this mint is executed once and then createFixture will ensure it is snapshotted
  // await zooToken.mint(tokenOwner.deployer, 100000).then(tx => tx.wait());

  const getDeployer = await getNamedAccounts()

  owner = getDeployer.deployer

  eggPrice = await zooDrop.eggPrice()

  return true
})

describe('ZooToken', () => {
  it.only('testing 1 2 3', async function () {
    // const { tokenOwner } = await setupTest()

    await setupTest()

    // console.log(zooToken)

    // console.log(tokenOwner)
    // await tokenOwner.TokenContract.mint(2);
  })
})

describe('ZooKeeper', () => {
  before(async () => {})

  beforeEach(async () => {})

  async function addAnimals() {}

  async function addHybrids() {}

  async function breedHybrid() {
    await zooToken.approve(zooKeeper.address, eggPrice * 100)

    const buyFirstEgg = await zooKeeper.buyEgg(1)

    const buyFirstEggReceipt = await buyFirstEgg.wait()

    let sender = buyFirstEggReceipt.events

    let from_add

    let token_id_1

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'BuyEgg') {
        from_add = sender[i].args['from']

        token_id_1 = sender[i].args['tokenID']
      }
    }

    const buySecondEgg = await zooKeeper.buyEgg(1)

    const buySecondEggReceipt = await buySecondEgg.wait()

    sender = buySecondEggReceipt.events

    let token_id_2

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'BuyEgg') {
        from_add = sender[i].args['from']

        token_id_2 = sender[i].args['tokenID']
      }
    }

    const firstHatchedAnimal = await zooKeeper.hatchEgg(1, token_id_1)

    const hatchFirstAnimalReceipt = await firstHatchedAnimal.wait()

    sender = hatchFirstAnimalReceipt.events

    let token_id_Animal_1

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'Hatch') {
        from_add = sender[i].args['from']

        token_id_Animal_1 = sender[i].args['tokenID']
      }
    }

    let secondHatchedAnimal = await zooKeeper.hatchEgg(1, token_id_2)

    const secondHatchedAnimalReceipt = await secondHatchedAnimal.wait()

    sender = secondHatchedAnimalReceipt.events

    let token_id_Animal_2

    let token_id_hybridEgg

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'Hatch') {
        from_add = sender[i].args['from']

        token_id_Animal_2 = sender[i].args['tokenID']
      }
    }

    const breedTx = await zooKeeper.breedAnimals(1, parseInt(token_id_Animal_1), parseInt(token_id_Animal_2))

    const breedReceipt = await breedTx.wait()

    sender = breedReceipt.events

    sender.forEach((element) => {
      if (element.event == 'Breed') {
        token_id_hybridEgg = element.args['_eggTokenId']
      }
    })

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'Breed') {
        token_id_hybridEgg = sender[i].args['tokenID']
      }
    }

    return parseInt(token_id_hybridEgg)
  }

  it.only('Should configure a playable game', async () => {
    // Increase allowance so we can buy 100 eggs for testing
    //  const eggPrice = await zooDrop.methods.eggPrice().call();
    //  const tsx = zooToken.methods
    //     .approve(keeperAdd, eggPrice*100)
    //     .send({ from: account })

    const approve = await zooToken.approve(zooKeeper.address, parseInt(eggPrice) * 100)

    // // Buy initial two eggs
    // await zooKeeper.methods.buyEgg(1).send({ from: account }).then((res) => {
    //     console.log('buyEgg', res)
    //  })

    // await zooKeeper.methods.buyEgg(1).send({ from: account }).then((res) => {
    //     console.log('buyEgg', res)
    //  })

    await zooKeeper.buyEgg(1)

    await zooKeeper.buyEgg(1)

    // // Hatch eggs into animals
    // await zooKeeper.methods.hatchEgg(1, 1).send({ from: account }).then((res) => {
    //   console.log('hatchEgg', res);
    // })

    // await zooKeeper.methods.hatchEgg(1, 2).send({ from: account }).then((res) => {
    //   console.log('hatchEgg', res);
    // })

    await zooKeeper.hatchEgg(1, 1)

    await zooKeeper.hatchEgg(1, 2)

    // Breed animals into hybrid egg
    // await zooKeeper.methods.breedAnimals(1, 3, 4).send({ from: account }).then((res) => {
    //   console.log('breedAnimals', res)
    // })

    await zooKeeper.breedAnimals(1, 3, 4)

    // Hatch hybrid egg into hybrid animal
    // await zooKeeper.methods.hatchEgg(1, 5).send({ from: account }).then((res) => {
    //   console.log('hatchEgg', res);
    // })

    await zooKeeper.hatchEgg(1, 5)

    // Free animal and collect yield
    // await zooKeeper.methods.freeAnimal(6).send({ from: account }).then((res) => {
    //     console.log('freeAnimal', res);
    //  })

    await zooKeeper.freeAnimal(6)

    // if (tokenBalance > 1) {
    //    const tokenID = await zooMedia.methods
    //       .tokenOfOwnerByIndex(account, 1)
    //       .call();
    //    console.log("tokenID", tokenID);
    //    const tokenURI = await zooMedia.methods.tokenURI(tokenID).call();
    //    console.log("tokenURI", tokenURI);
    //    const token = await zooKeeper.methods.tokens(tokenID).call();
    //    console.log("token", token);
    // }

    // TOTAL EGGS AFTER THIS TEST = 2
  })

  /*
    Deploy Script
    */
  it.only('Should get the ZooDrop owner', async () => {
    const zooDropOwner: string = await zooKeeper.owner()

    expect(zooDropOwner).to.equal(owner)
  })

  /**
   * DROP
   */
  // it("Should create a new ZooKeeper contract with AddDrop event", async () => {

  //     const block = await ethers.provider.getBlockNumber();

  //     await zooKeeper.connect(signers[0]).addDrop("test1", 16000, 210);

  //     let events = await zooKeeper.queryFilter(zooKeeper.filters.AddDrop(null, null), block);

  //     expect(events.length).eq(1);

  //     const log = zooKeeper.interface.parseLog(events[0]);

  //     expect(log.name).to.equal("AddDrop");

  //     expect(log.args._dropID.toNumber()).to.equal(2);
  // });

  /**
   * BUYING EGGS
   */
  it.only('Should buy a basic egg', async () => {
    const buyEgg = await zooKeeper.buyEgg(1)

    const buyEggReceipt = await buyEgg.wait()

    const sender = buyEggReceipt.events

    let from_add: any

    let token_id: any

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'BuyEgg') {
        from_add = sender[i].args['from']

        token_id = sender[i].args['tokenID']
      }
    }

    expect(from_add).to.equal(owner)

    expect(parseInt(token_id._hex)).to.equal(7)

    // add check for types mapping
    // expect(await zooKeeper.types(parseInt(token_id._hex))).to.equal(parseInt(token_id._hex));

    // // check eggs mapping for new egg
    // let egg = await zooKeeper.eggs(parseInt(token_id._hex));

    // console.log(egg.eggCreationTime)

    // expect(egg.eggCreationTime.toNumber()).to.greaterThan(0);

    // TOTAL EGGS AFTER THIS TEST = 3
  })

  it.only('Should buy multiple basic eggs', async () => {
    const preEggSupply = await zooDrop.eggSupply()

    for (var i = 0; i < 3; i++) {
      await zooKeeper.buyEgg(1)
    }

    const totalSupply = await zooDrop.totalSupply()

    const postEggSupply = await zooDrop.eggSupply()

    // expect(parseInt(postEggSupply)).to.be.equal(parseInt(preEggSupply) - parseInt(totalSupply))

    // TOTAL EGGS AFTER THIS TEST = 6
  })

  it('Should revert when totalSupply of eggs are reaching', async () => {
    await zooKeeper.connect(owner).addDrop('test3', 1, 210)

    await zooKeeper.setTokenURI(3, 'basicEgg', 'basicEgg.tokenURI1')
    await zooKeeper.setMetadataURI(3, 'basicEgg', 'basicEgg.metadataURI1')
    await zooKeeper.setTokenURI(3, 'hybridEgg', 'hybridEgg.tokenURI1')
    await zooKeeper.setMetadataURI(3, 'hybridEgg', 'hybridEgg.metadataURI1')

    const dropAddress = await zooKeeper.drops(3)

    const drop = await ethers.getContractAt('ZooDrop', dropAddress)

    await zooToken.approve(zooKeeper.address, 500)

    const preBal = await zooToken.balanceOf(owner.address)

    await zooKeeper.connect(signers[0]).buyEgg(3)

    const postBal = await zooToken.balanceOf(owner.address)

    const totalSupply = await drop.totalSupply()

    const currentSupply = await drop.currentSupply()

    await expect(zooKeeper.connect(signers[0]).buyEgg(3)).to.be.revertedWith('There are no more Eggs that can be purchased')

    expect(parseInt(postBal._hex)).to.equal(parseInt(preBal._hex) - 210)

    expect(parseInt(totalSupply._hex)).to.equal(1)

    expect(parseInt(currentSupply._hex)).to.equal(0)
  })

  it.only('Should revert when not enough balance', async () => {
    await zooToken.connect(signers[1]).approve(signers[2].address, BigInt(1e30))

    await zooToken.connect(signers[1]).transfer(signers[2].address, BigInt(1e22))

    await zooToken.connect(signers[1]).approve(zooKeeper.address, parseInt(eggPrice))

    await expect(zooKeeper.connect(signers[1]).buyEgg(1)).to.be.revertedWith('ZK: Not Enough ZOO to purchase Egg')
  })

  // Skip for now
  it('Should share bidshare from buy egg to contract owner', async () => {})

  /**
   * HATCHING EGGS
   */
  it.only('Should hatch & burn basic egg', async () => {
    const totalSupply = await zooDrop.totalSupply()

    await zooToken.approve(zooKeeper.address, eggPrice)

    const buyEgg = await zooKeeper.buyEgg(1)

    const buyEggReceipt = await buyEgg.wait()

    let sender = buyEggReceipt.events

    let from_add: any

    let token_id: any

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'BuyEgg') {
        from_add = sender[i].args['from']

        token_id = sender[i].args['tokenID']
      }
    }

    const hatchEgg = await zooKeeper.hatchEgg(1, parseInt(token_id))

    const hatchEggReceipt = await hatchEgg.wait()

    sender = hatchEggReceipt.events

    let from_add2: any

    let token_id2: any

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'Hatch') {
        from_add2 = sender[i].args['from']

        token_id2 = sender[i].args['tokenID']
      }
    }

    expect(from_add2).to.equal(owner)

    expect(parseInt(token_id2)).to.equal(12)

    const newAnimal = await zooDrop.animals(1)

    expect(newAnimal[0].name).to.not.equal('')
  })

  it.only('Should hatch & burn hybrid egg', async () => {
    const token = await breedHybrid()

    const hatchEgg = await zooKeeper.hatchEgg(1, token)

    const hatchEggReceipt = await hatchEgg.wait()

    let sender = hatchEggReceipt.events

    let from_add2

    let token_id2

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'Hatch') {
        from_add2 = sender[i].args['from']

        token_id2 = sender[i].args['tokenID']
      }
    }

    expect(from_add2).to.equal(owner)

    expect(parseInt(token_id2)).to.equal(18)
  })

  it.only('Should revert when hatching egg with invalid tokenid', async () => {
    await zooToken.approve(zooKeeper.address, eggPrice)

    await zooKeeper.buyEgg(1)

    await expect(zooKeeper.hatchEgg(1, 525600)).to.be.revertedWith('Egg is burned or does not exist')
  })

  it('Should revert when egg creation time restriction is not met', async () => {})

  /**
   * BREEDING
   */
  it.only('Should breed a hybrid egg', async () => {
    await zooToken.approve(zooKeeper.address, eggPrice * 100)

    const buyFirstEgg = await zooKeeper.buyEgg(1)

    const buyFirstEggReceipt = await buyFirstEgg.wait()

    let sender = buyFirstEggReceipt.events

    let from_add

    let token_id_1

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'BuyEgg') {
        from_add = sender[i].args['from']

        token_id_1 = sender[i].args['tokenID']
      }
    }

    const buySecondEgg = await zooKeeper.buyEgg(1)

    const buySecondEggReceipt = await buySecondEgg.wait()

    sender = buySecondEggReceipt.events

    let token_id_2

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'BuyEgg') {
        from_add = sender[i].args['from']

        token_id_2 = sender[i].args['tokenID']
      }
    }

    const firstHatchedAnimal = await zooKeeper.hatchEgg(1, parseInt(token_id_1))

    const hatchFirstAnimalReceipt = await firstHatchedAnimal.wait()

    sender = hatchFirstAnimalReceipt.events

    let token_id_Animal_1

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'Hatch') {
        from_add = sender[i].args['from']

        token_id_Animal_1 = sender[i].args['tokenID']
      }
    }

    let secondHatchedAnimal = await zooKeeper.hatchEgg(1, parseInt(token_id_2))

    const secondHatchedAnimalReceipt = await secondHatchedAnimal.wait()

    sender = secondHatchedAnimalReceipt.events

    let token_id_Animal_2

    let token_id_hybridEgg

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'Hatch') {
        from_add = sender[i].args['from']

        token_id_Animal_2 = sender[i].args['tokenID']
      }
    }

    await ethers.provider.send('evm_setNextBlockTimestamp', [9617249934])

    const breedTx = await zooKeeper.breedAnimals(1, token_id_Animal_1, token_id_Animal_2)

    const breedReceipt = await breedTx.wait()

    sender = breedReceipt.events

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'Breed') {
        token_id_hybridEgg = sender[i].args['tokenID']
      }
    }

    expect(parseInt(token_id_hybridEgg)).to.equal(24)

    // const eggType = await zooKeeper.connect(owner).types(token_id_hybridEgg);
    // expect(eggType).to.equal(2);
  })

  it.only('Should revert when there is breedCooldown', async () => {
    const buyFirstEgg = await zooKeeper.buyEgg(1)

    const buyFirstEggReceipt = await buyFirstEgg.wait()

    let sender = buyFirstEggReceipt.events

    let from_add

    let token_id_1

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'BuyEgg') {
        from_add = sender[i].args['from']

        token_id_1 = sender[i].args['tokenID']
      }
    }

    const buySecondEgg = await zooKeeper.buyEgg(1)

    const buySecondEggReceipt = await buySecondEgg.wait()

    sender = buySecondEggReceipt.events

    let token_id_2

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'BuyEgg') {
        from_add = sender[i].args['from']

        token_id_2 = sender[i].args['tokenID']
      }
    }

    const firstHatchedAnimal = await zooKeeper.hatchEgg(1, token_id_1)

    const hatchFirstAnimalReceipt = await firstHatchedAnimal.wait()

    sender = hatchFirstAnimalReceipt.events

    let token_id_Animal_1

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'Hatch') {
        from_add = sender[i].args['from']

        token_id_Animal_1 = sender[i].args['tokenID']
      }
    }

    let secondHatchedAnimal = await zooKeeper.hatchEgg(1, token_id_2)

    const secondHatchedAnimalReceipt = await secondHatchedAnimal.wait()

    sender = secondHatchedAnimalReceipt.events

    let token_id_Animal_2

    let token_id_hybridEgg

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'Hatch') {
        from_add = sender[i].args['from']

        token_id_Animal_2 = sender[i].args['tokenID']
      }
    }

    // await expect(zooKeeper.breedAnimals(1, token_id_Animal_2, token_id_Animal_1))
    //     .to.be.revertedWith("Must wait for cooldown to finish.")
  })
  it.only('Should revert when breeding with a hybrid', async () => {
    const buyFirstEgg = await zooKeeper.buyEgg(1)

    const buyFirstEggReceipt = await buyFirstEgg.wait()

    let sender = buyFirstEggReceipt.events

    let from_add

    let token_id_1

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'BuyEgg') {
        from_add = sender[i].args['from']

        token_id_1 = sender[i].args['tokenID']
      }
    }

    const buySecondEgg = await zooKeeper.buyEgg(1)

    const buySecondEggReceipt = await buySecondEgg.wait()

    sender = buySecondEggReceipt.events

    let token_id_2

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'BuyEgg') {
        from_add = sender[i].args['from']

        token_id_2 = sender[i].args['tokenID']
      }
    }

    const firstHatchedAnimal = await zooKeeper.hatchEgg(1, token_id_1)

    const hatchFirstAnimalReceipt = await firstHatchedAnimal.wait()

    sender = hatchFirstAnimalReceipt.events

    let token_id_Animal_1

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'Hatch') {
        from_add = sender[i].args['from']

        token_id_Animal_1 = sender[i].args['tokenID']
      }
    }

    let secondHatchedAnimal = await zooKeeper.hatchEgg(1, token_id_2)

    const secondHatchedAnimalReceipt = await secondHatchedAnimal.wait()

    sender = secondHatchedAnimalReceipt.events

    let token_id_Animal_2

    let token_id_hybridEgg

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'Hatch') {
        from_add = sender[i].args['from']

        token_id_Animal_2 = sender[i].args['tokenID']
      }
    }

    // await ethers.provider.send("evm_increaseTime", [432000]);
    await ethers.provider.send('evm_setNextBlockTimestamp', [19234499888])

    const breedTx = await zooKeeper.breedAnimals(1, token_id_Animal_1, token_id_Animal_2)

    const breedReceipt = await breedTx.wait()

    sender = breedReceipt.events

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'Breed') {
        token_id_hybridEgg = sender[i].args['tokenID']
      }
    }

    const firstHatchedHybridAnimal = await zooKeeper.hatchEgg(1, token_id_hybridEgg)

    const firstHatchedHybridAnimalReceipt = await firstHatchedHybridAnimal.wait()

    sender = firstHatchedHybridAnimalReceipt.events

    let token_id_Hybrid_Animal

    for (var i = 0; i < sender.length; i++) {
      if (sender[i].event === 'Hatch') {
        from_add = sender[i].args['from']

        token_id_Hybrid_Animal = sender[i].args['tokenID']
      }
    }

    expect(parseInt(token_id_Hybrid_Animal)).to.equal(34)

    // await ethers.provider.send("evm_increaseTime", [432000]);
    await ethers.provider.send('evm_setNextBlockTimestamp', [38468999776])

    await expect(zooKeeper.breedAnimals(1, token_id_Animal_1, token_id_Hybrid_Animal)).to.be.revertedWith('Only BASE_ANIMAL can breed.')
  })

  it.only('Should revert when breeding with two hybrids', async () => {
    const token_1 = breedHybrid()

    const token_2 = breedHybrid()

    await expect(zooKeeper.breedAnimals(1, token_1, token_2)).to.be.revertedWith('Only BASE_ANIMAL can breed.')
  })

  // // /**
  // //  * FREEING
  // //  */

  it('Should free a basic animal', async () => {
    await zooToken.approve(zooKeeper.address, 600)

    const buyEgg = await zooKeeper.connect(owner).buyEgg(1)

    const buyEggReceipt = await buyEgg.wait()

    let sender = buyEggReceipt.events

    let from_add
    let token_id

    sender.forEach((element) => {
      if (element.event == 'BuyEgg') {
        from_add = element.args['_from']
        token_id = element.args['_tokenID']
      }
    })

    const hatchEgg = await zooKeeper.hatchEgg(1, token_id)
    const hatchEggReceipt = await hatchEgg.wait()

    sender = hatchEggReceipt.events

    let from_add2
    let token_id2
    let _yield

    sender.forEach((element) => {
      if (element.event == 'Hatch') {
        from_add2 = element.args['_from']
        token_id2 = element.args['_tokenID']
      }
    })

    //     const prevBalance = await zooToken.balanceOf(owner.address);

    // TODO increase block number and test yield
    // await ethers.provider.send("evm_setNextBlockTimestamp", [9617249934]);

    // const freedReceipt = await freed.wait();

    // sender = freedReceipt.events;

    // sender.forEach(element => {
    //     if (element.event == "Burn") {
    //         from_add2 = element.args["_from"]
    //         token_id2 = element.args["_tokenID"]
    //     } else if (element.event == "FreeAnimal") {
    //         from_add = element.args["_from"]
    //         token_id = element.args["_tokenID"]
    //         _yield = element.args["_yield"]
    //     }
    // });

    // expect(from_add2).to.equal(owner.address);
    // expect(token_id2.toNumber()).to.equal(38);

    // expect(from_add).to.equal(owner.address);
    // expect(token_id.toNumber()).to.equal(38);
    // expect(_yield.toNumber()).to.greaterThan(0);

    // const newAnimal = await zooKeeper.animals(token_id.toNumber());
    // expect(newAnimal.name).to.equal('');

    // const newBalance = await zooToken.balanceOf(owner.address);
    // expect(newBalance.toNumber()).to.greaterThan(prevBalance.toNumber());
  })

  it('Should free a hybrid animal', async () => {
    // await ethers.provider.send("evm_increaseTime", [432000]);
    // await ethers.provider.send("evm_setNextBlockTimestamp", [96172499440]);
    // const tokenId = await breedHybrid();
    // const hatchEgg = await zooKeeper.hatchEgg(1, tokenId)
    // const hatchEggReceipt = await hatchEgg.wait();
    // let sender = hatchEggReceipt.events;
    // let from_add
    // let token_id
    // let from_add2
    // let token_id2
    // let _yield
    // sender.forEach(element => {
    //     if (element.event == "Hatch") {
    //         from_add2 = element.args["_from"]
    //         token_id2 = element.args["_tokenID"]
    //     }
    // });
    // const prevBalance = await zooToken.balanceOf(owner.address);
    // // TODO increase block number and test yield
    // await ethers.provider.send("evm_setNextBlockTimestamp", [192344998892]);
    // const freed = await zooKeeper.freeAnimal(token_id2);
    // const freedReceipt = await freed.wait();
    // sender = freedReceipt.events
    // sender.forEach(element => {
    //     if (element.event == "Burn") {
    //         from_add2 = element.args["_from"]
    //         token_id2 = element.args["_tokenID"]
    //     } else if (element.event == "FreeAnimal") {
    //         from_add = element.args["_from"]
    //         token_id = element.args["_tokenID"]
    //         _yield = element.args["_yield"]
    //     }
    // });
    // expect(from_add2).to.equal(owner.address);
    // expect(token_id2.toNumber()).to.equal(44);
    // expect(from_add).to.equal(owner.address);
    // expect(token_id.toNumber()).to.equal(44);
    // expect(_yield.toNumber()).to.greaterThan(0);
    // const newAnimal = await zooKeeper.animals(token_id.toNumber());
    // expect(newAnimal.name).to.equal('');
    // const newBalance = await zooToken.balanceOf(owner.address);
    // expect(newBalance.toNumber()).to.greaterThan(prevBalance.toNumber());
  })
})
