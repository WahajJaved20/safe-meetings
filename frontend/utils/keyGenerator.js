const crypto = require("crypto");

function generatePair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
  return [
    publicKey.export({
      type: "pkcs1",
      format: "pem",
    }),

    privateKey.export({
      type: "pkcs1",
      format: "pem",
    }),
  ];
}
function encryptData(publicKey, data) {
  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKey,
      oaepHash: "sha1",
    },
    Buffer.from(data)
  );
  return encryptedData;
}

function decryptData(privateKey, data) {
  const decryptedData = crypto.privateDecrypt(
    {
      key: privateKey,
      oaepHash: "sha1",
    },
    data
  );
  return decryptedData;
}

module.exports = { generatePair, encryptData, decryptData };
// const data = generatePair();
// const publicKey = data[0];
// const privateKey = data[1];
// const enc = encryptData(
//   publicKey,
//   "QmWmchBS9GCn2ukDNWkPVLCkwLL9xuaYX6wq1TSK6CLoLK"
// ).toString("base64");
// const dec = decryptData(privateKey, Buffer.from(enc, "base64"));
// console.log(dec.toString());
