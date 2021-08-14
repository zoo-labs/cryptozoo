// deploy/03_deploy_zoo_keeper.ts

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const tokenAddress = (await deployments.get('ZooToken')).address
  const marketAddress = (await deployments.get('ZooMarket')).address
  const mediaAddress = (await deployments.get('ZooMedia')).address

  const deployResult = await deploy('ZooKeeper', {
    from: deployer,
    args: [],
    log: true,
  })

  // const keeperAddress = deployResult.address

  // const token = await ethers.getContractAt('ZooToken', tokenAddress)
  // const market = await ethers.getContractAt('ZooMarket', marketAddress)
  // const media = await ethers.getContractAt('ZooMedia', mediaAddress)
  // const keeper = await ethers.getContractAt('ZooKeeper', keeperAddress)

  // // Configure contracts to talk to each other
  // market.configure(keeperAddress, mediaAddress)
  // media.configure(keeperAddress, marketAddress)
  // keeper.configure(marketAddress, mediaAddress, tokenAddress)

  // // Mint ZOO to keeper for yield
  // token.mint(keeperAddress, 1000000000000)

  // return hre.network.live
}

export default func
func.id = 'keeper'
func.tags = ['ZooKeeper']
// func.dependencies = ['ZooMedia', 'ZooMarket']
