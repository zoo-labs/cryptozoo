// deploy/01_deploy_market.js

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  await deploy('Market', {
    from: deployer,
    args: [],
    log: true,
  })
}

export default func
func.id = 'deploy_zoo_market'
func.tags = ['Market']
