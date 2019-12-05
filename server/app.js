const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 3000;

const stopsilidza = require("./routes/api/stopsilidza");
const stopsbascarsija = require("./routes/api/stopsbascarsija");
const news = require("./routes/api/news");
app.use("/api/stopsilidza", stopsilidza);
app.use("/api/stopsbascarsija", stopsbascarsija);
app.use("/api/news", news);
//app.post("/", (req, res) => res.send());

app.listen(port, () => console.log(`Sever is started on port ${port}`));
