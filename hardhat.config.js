require("dotenv-defaults").config();
require("@nomicfoundation/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("./scripts/tasks");
const LACHAIN_TESTNET_RPC_URL = process.env.LACHAIN_TESTNET_RPC_URL;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;

const PRIVATE_KEY_ADMIN = process.env.PRIVATE_KEY_ADMIN;
const PRIVATE_KEY_USER = process.env.PRIVATE_KEY_USER;
const LACHAIN_EXPLORER_URL = process.env.LACHAIN_EXPLORER_URL;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    lachain: {
      url: LACHAIN_TESTNET_RPC_URL,
      accounts: [PRIVATE_KEY_ADMIN, PRIVATE_KEY_USER],
      chainId: 418,
      gasPrice:900000000000,
      gasLimit: 10000000,
     // gasMultiplier: 3,
    },
  },
  etherscan: {
    apiKey: {
      lachain: ETHERSCAN_KEY,
    },
    customChains: [
      {
        network: "lachain",
        chainId: 418,
        urls: {
          apiURL: LACHAIN_EXPLORER_URL + "/api",
          browserURL: LACHAIN_EXPLORER_URL,
        },
      },
    ],
  },
  gasReporter: {
    enabled: false,
  },
  solidity: {
    compilers: [
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },

    ],
  },
  mocha: {
    timeout: 20000,
  },
};


