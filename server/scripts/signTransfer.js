const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

// ##############################################################
// Sign the transaction from the client side
async function hashTransaction(transaction) {
  const transactionBytes = utf8ToBytes(transaction);
  const hashedTransaction = keccak256(transactionBytes);

  return hashedTransaction;
}

async function signTransaction(transaction, PRIVATE_KEY) {
  const hashedTransaction = await hashTransaction(transaction);
  var recovered = true;
  const signedTransaction = await secp.sign(hashedTransaction, PRIVATE_KEY, {
    recovered: true,
  });
  return signedTransaction;
}

async function recover(transaction, signature, recoveryBit) {
  const hashedTransaction = await hashTransaction(transaction);
  const PUBLIC_KEY = secp.recoverPublicKey(
    hashedTransaction,
    signature,
    recoveryBit
  );
  return PUBLIC_KEY;
}

async function getPublicKey(transaction, PRIVATE_KEY) {
  const [sig, recoveryBit] = await signTransaction(transaction, PRIVATE_KEY);
  const recovered = await recover(transaction, sig, recoveryBit);
  return toHex(recovered);
}

module.exports = signTransaction;
module.exports = getPublicKey;
