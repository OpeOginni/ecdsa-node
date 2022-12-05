const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const getPublicKey = require("./scripts/signTransfer");
const { toHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "04ecd005151189593c51d655b59bb4754ac51162f449a8443db55bce4e17c51f6783bef138ae0a5186311743f3062c1b12e96410e8a1d36c607ae5f458378c401d": 100,
  "04b65eaa4d11eb1bd1ec4aefd3199bb03f52cd534121373384cbec0f13552a75e25291b9b2c50596ff61c6a7b824e13bdbb628f18ac98dae499a37d4b0ea593879": 50,
  "049fb09d3626c7a2b08091851804630834c3dba75634fb6118eff728b7d06a682d1f8eb9762bf8541cff48a8dce5fc540ff3a5ce07359cfc94babb643a28773a25": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  // TODO: get a signature from the client-side application
  // recover the public address from the signature

  const { sender, recipient, amount, privateKey } = req.body;
  setInitialBalance(sender);
  setInitialBalance(recipient);

  const publicKey = await verifyPublicKey(
    {
      sender: sender,
      recipient: recipient,
      amount: amount,
    },
    privateKey
  );
  if (publicKey !== sender) {
    res.status(400).send({ message: "Wrong Private Key" });
  } else {
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

async function verifyPublicKey(transaction, privateKey) {
  const recoveredPublicKey = await getPublicKey(
    { transaction }.toString(),
    privateKey
  );
  return recoveredPublicKey;
}
