import { ethers } from 'hardhat'
import sleep from './utils/sleep'
import { getLedgerSigner } from './utils/ledger-signer'
const hre = require('hardhat')

const deploy = async () => {
  const ledgerSigner = await getLedgerSigner()

  console.log(`Deploying with account: ${await ledgerSigner.getAddress()}`)

  // const ProtocolFeesDistributorFactory = await ethers.getContractFactory('PolygonProtocolFeesDistributor')
  const ProtocolFeesDistributorFactory = await (
    await ethers.getContractFactory('ETHProtocolFeesDistributor')
  ).connect(ledgerSigner)
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
