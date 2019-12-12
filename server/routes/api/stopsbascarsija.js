const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();

const uri =
  "mongodb+srv://admin:admin@cluster0-b8i1n.gcp.mongodb.net/revizor-radar?retryWrites=true&w=majority";

router.get("/", async (req, res) => {
  const client = await mongodb.MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  const db = await client.db("revizor-radar");
  const stops = db.collection("stopsBascarsija");
  res.send(await stops.find({}).toArray());
  client.close();
});
router.post("/", async (req, res) => {
  const client = await mongodb.MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  const db = await client.db("revizor-radar");
  const stops = db.collection("stopsBascarsija");
  await stops.findOneAndUpdate(
    { id: req.body.id },
    {
      $set: {
        revizori: req.body.revizori,
        dateUpdated: req.body.dateUpdated
      }
    }
  );
  res.status(201).send("Updated");
  client.close();
});
/*async function loadStopsCollection() {
  const client = await mongodb.MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  return client.db("revizor-radar");
}*/

module.exports = router;