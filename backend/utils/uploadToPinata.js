const pinataSDK = require("@pinata/sdk");
const fs = require("fs");
const path = require("path");

const pinataApiKey = process.env.PINATA_API_KEY;
const pinataApiSecret = process.env.PINATA_SECRET_API_KEY;
const pinata = pinataSDK(pinataApiKey, pinataApiSecret);

async function storeImages(pdfFilePath) {
  const fullPdfPath = path.resolve(pdfFilePath);
  const files = fs.readdirSync(fullPdfPath);
  let responses = [];
  for (fileIndex in files) {
    const readableStreamForFile = fs.createReadStream(
      `${fullPdfPath}/${files[fileIndex]}`
    );
    try {
      const response = await pinata.pinFileToIPFS(readableStreamForFile);
      responses.push(response);
    } catch (error) {
      console.log(error);
    }
  }
  return { responses, files };
}

async function storeTokeUriMetadata(metadata) {
  try {
    const response = await pinata.pinJSONToIPFS(metadata);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
}

module.exports = { storeImages, storeTokeUriMetadata };
