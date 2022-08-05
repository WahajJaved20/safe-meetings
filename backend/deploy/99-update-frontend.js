const { ethers, network } = require("hardhat");
const fs = require("fs");

const contractFile = "../frontend/constants/networkMapping.json";
const AbiFile = "../frontend/constants/contractAbi.json";

module.exports = async function () {
  console.log("Updating frontend ... ");
  await updateContractAddresses();
  await updateContractAbi();
};

async function updateContractAbi() {
  const safeMeeting = await ethers.getContract("SafeMeeting");
  fs.writeFileSync(
    AbiFile,
    safeMeeting.interface.format(ethers.utils.FormatTypes.json)
  );
}
async function updateContractAddresses() {
  const safeMeeting = await ethers.getContract("SafeMeeting");
  const chainId = network.config.chainId.toString();
  const contractAddresses = JSON.parse(fs.readFileSync(contractFile, "utf8"));
  if (chainId in contractAddresses) {
    if (
      !contractAddresses[chainId]["SafeMeeting"].includes(safeMeeting.address)
    ) {
      contractAddresses[chainId]["SafeMeeting"].push(safeMeeting.address);
    }
  } else {
    contractAddresses[chainId] = {
      SafeMeeting: [safeMeeting.address],
    };
  }
  fs.writeFileSync(contractFile, JSON.stringify(contractAddresses));
}
module.exports.tags = ["all", "frontend"];
