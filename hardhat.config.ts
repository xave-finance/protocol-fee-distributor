require('dotenv').config()

import '@typechain/hardhat'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-gas-reporter'

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID || ''
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ''
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || ''
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || ''
const MNEMONIC_SEED = process.env.MNEMONIC || ''

export default {
  gasReporter: {
    // gasPrice: 21,
    enabled: true,
  },
  solidity: '0.8.6',
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: MNEMONIC_SEED,
      },
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      chainId: 1,
      accounts: {
        mnemonic: MNEMONIC_SEED,
      },
    },
    matic: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: {
        mnemonic: MNEMONIC_SEED,
      },
      minGasPrice: 10000000000000,
    },
    localhost: {
      chainId: 1337,
      url: 'http://127.0.0.1:8545/',
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
    // apiKey: POLYGONSCAN_API_KEY,
  },
}
