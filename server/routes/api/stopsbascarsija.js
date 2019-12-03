const express = require("express");
const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const router = express.Router();

const uri =
  "mongodb+srv://admin:admin@cluster0-b8i1n.gcp.mongodb.net/revizor-radar?retryWrites=true&w=majority";

router.get("/", async (req, res) => {
  const stops = await loadStopsCollection();
  res.send(await stops.find({}).toArray());
});
router.post("/", async (req, res) => {
  const stop = await updateStop();
  await stop.findOneAndUpdate(
    { id: req.body.id },
    {
      $set: {
        revizori: req.body.revizori,
        dateUpdated: req.body.dateUpdated
      }
    }
  );
  res.status(201).send("Updated");
});
async function loadStopsCollection() {
  const client = await mongodb.MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  return client.db("revizor-radar").collection("stopsBascarsija");
}
async function updateStop() {
  const client = await mongodb.MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  return client.db("revizor-radar").collection("stopsBascarsija");
}
module.exports = router;
