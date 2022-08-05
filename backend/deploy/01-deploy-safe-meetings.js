const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
const {
  storeImages,
  storeTokeUriMetadata,
} = require("../utils/uploadToPinata");
const metadataTemplate = {
  name: "",
  description: "",
  pdf: "",
};
let pdfUris = [];
const pdfLocation = "./assets/";
module.exports = async function ({ getNamedAccounts, deployments }) {
  if (process.env.UPLOAD_TO_PINATA == "true") {
    pdfUris = await handlepdfUris();
  }
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("------------------------");
  const args = [];
  const safeMeetings = await deploy("SafeMeeting", {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: 4,
  });
  if (
    !developmentChains.includes(network.name) &&
    process.env.POLYGONSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(safeMeetings.address, args);
  }
  log("------------------------");
};

async function handlepdfUris() {
  pdfUris = [];
  const { responses: pdfUploadResponses, files } = await storeImages(
    pdfLocation
  );
  for (pdfUploadResponseIndex in pdfUploadResponses) {
    let tokenUriMetadata = { ...metadataTemplate };
    tokenUriMetadata.name = files[pdfUploadResponseIndex].replace(".pdf", "");
    tokenUriMetadata.description = `A test PDF File`;
    tokenUriMetadata.pdf = `ipfs://${pdfUploadResponses[pdfUploadResponseIndex].IpfsHash}`;
    console.log(`Uploading ${tokenUriMetadata.name}...`);
    const metadataUploadResponse = await storeTokeUriMetadata(tokenUriMetadata);
    pdfUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`);
  }
  console.log("Token URIs uploaded! They are:");
  console.log(pdfUris);
  return pdfUris;
}

module.exports.tags = ["all", "safemeetings"];
