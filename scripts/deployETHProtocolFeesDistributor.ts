import { ethers } from 'hardhat'
const hre = require('hardhat')
import sleep from './utils/sleep'
import { getLedgerSigner } from './utils/ledger-signer'

const deploy = async () => {
  const [deployer] = await ethers.getSigners()
  console.log(`Deploying with account: ${deployer.address}`)

  // const ledgerSigner = await getLedgerSigner()
  // const ProtocolFeesDistributorFactory = await (await ethers.getContractFactory('ETHProtocolFeesDistributor')).connect(ledgerSigner)

  const ProtocolFeesDistributorFactory = await await ethers.getContractFactory('ETHProtocolFeesDistributor')
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
