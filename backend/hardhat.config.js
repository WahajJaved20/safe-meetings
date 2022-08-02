require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1,
    },
    Mumbai: {
      chainId: 80001,
      blockConfirmations: 4,
      url: MUMBAI_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    localhost: {
      chainId: 31337,
    },
  },
  solidity: {
    compilers: [{ version: "0.8.8" }],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
  },
  mocha: {
    timeout: "200000000000000000000",
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
  },
};
