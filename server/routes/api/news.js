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
  const db = await client.db("revizor-radar");;
  const news = db.collection("news");
  res.send(
    await news
      .find({})
      .sort({ dateUpdated: -1 })
      .limit(5)
      .toArray()
  );
  client.close();
});
router.post("/", async (req, res) => {
  const client = await mongodb.MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  const db = await client.db("revizor-radar");;
  const news = db.collection("news");
  await news.insertOne({
    dateUpdated: req.body.dateUpdated,
    id: req.body.id,
    name: req.body.name,
    revizori: req.body.revizori,
    updatedBy: req.body.updatedBy
  });
  res.status(201).send("News Updated");
  client.close();
});

/*async function getNews() {
  const client = await mongodb.MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  return client.db("revizor-radar");
}*/

module.exports = router;
