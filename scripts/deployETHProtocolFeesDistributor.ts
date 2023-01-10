import { ethers } from 'hardhat'
import sleep from './utils/sleep'
const hre = require('hardhat')

const deploy = async () => {
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with the account:', deployer.address)
  const ProtocolFeesDistributorFactory = await ethers.getContractFactory('ETHProtocolFeesDistributor')

  const protocolFeesDistributor = await ProtocolFeesDistributorFactory.deploy()
  await protocolFeesDistributor.deployed()
  console.log(`protocolFeesDistributor deployed at: ${protocolFeesDistributor.address}`)

  await sleep(60000)

  console.log('verifying protocolFeesDistributor')
  await hre.run('verify:verify', {
    address: protocolFeesDistributor.address,
    constructorArguments: [],
    contract: 'contracts/ETHProtocolFeesDistributor.sol:ETHProtocolFeesDistributor',
  })
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => console.error(error))
