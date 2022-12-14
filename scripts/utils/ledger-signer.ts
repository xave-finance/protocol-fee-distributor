import { Signer, Contract, ContractTransaction } from 'ethers'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { BuidlerRuntimeEnvironment } from '@nomiclabs/buidler/types'

export let DRE: HardhatRuntimeEnvironment | BuidlerRuntimeEnvironment

export const setDRE = (_DRE: HardhatRuntimeEnvironment | BuidlerRuntimeEnvironment) => {
  DRE = _DRE
}

export const getLedgerSigner = async (): Promise<Signer> => {
  // Create a Frame connection
  const ethProvider = require('eth-provider') // eth-provider is a simple EIP-1193 provider
  const frame = ethProvider('frame') // Connect to Frame

  const framerRPC = 'http://127.0.0.1:1248'

  const ledgerProvider = await new DRE.ethers.providers.JsonRpcProvider(framerRPC)
  const signer = await ledgerProvider.getSigner(0)

  return signer
}