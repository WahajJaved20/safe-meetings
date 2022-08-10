function generatePair() {
  const rsa = require("node-rsa");
  var key = new rsa().generateKeyPair();
  key.setOptions({ encryptionScheme: "pkcs1" });
  var publicKey = key.exportKey("public");
  var privateKey = key.exportKey("private");
  return [publicKey, privateKey];
}
function encryptData(privateKey, value) {
  const rsa = require("node-rsa");
  var privateKey = new rsa();
  privateKey.setOptions({ encryptionScheme: "pkcs1" });
  privateKey.importKey(privateKey);
  return privateKey.encryptPrivate(value, "base64");
}
function decryptData(publicKey, value) {
  const rsa = require("node-rsa");
  publicKey.setOptions({ encryptionScheme: "pkcs1" });
  var publicKey = new rsa();
  publicKey.importKey(publicKey);
  return publicKey.decryptPublic(value, "utf8");
}
module.exports = { generatePair, encryptData, decryptData };
