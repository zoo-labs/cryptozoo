// deploy/01_z.ts

import { Deploy } from '@zoolabs/contracts/utils/deploy'

export default Deploy('Z', [], async({ hre, deploy, deployments, deps }) => {
  await deploy()
})