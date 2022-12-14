import { ethers } from 'hardhat'
const hre = require('hardhat')
import sleep from './utils/sleep'

const deploy = async () => {
	const [deployer] = await ethers.getSigners()
	console.log(`Deploying with account: ${deployer.address}`)

	const ProtocolFeesDistributorFactory = await ethers.getContractFactory('ETHProtocolFeesDistributor')
	const protocolFeesDistributor = await ProtocolFeesDistributorFactory.deploy()
	await protocolFeesDistributor.deployed()
	console.log(`protocolFeesDistributor deployed at: ${protocolFeesDistributor.address}`)

  await sleep(60000)

  console.log('verifying protocolFeesDistributor')
  await hre.run('verify:verify', {
    address: protocolFeesDistributor.address,
    constructorArguments: [],
  })
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => console.error(error))