const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const bcrypt = require('bcryptjs');
const uri =
    "mongodb+srv://admin:admin@cluster0-b8i1n.gcp.mongodb.net/revizor-radar?retryWrites=true&w=majority";

router.get("/", async (req, res) => {
    const users = await getUsers();
    await users
        .findOne({ email: req.query.email }, function (err, user) {
            if (req.session.user) {
                res.status(200).send({ response: true, name: req.session.name });
            } else {
                try {

                    req.session.user = user.email;
                    req.session.name = user.name;
                    bcrypt.compare(req.query.password, user.password, function (err, response) {
                        if (response) {
                            res.status(200).send({ response: response, name: user.name })
                        } else {
                            res.status(200).send({ error: "Wrong password" })
                        }
                    })

                }

                catch (err) {
                    res.status(200).send({ error: "Wrong email" });
                }
            }

        })
});
router.post("/", async (req, res) => {
    const users = await getUsers();
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            users.findOne({ email: req.body.email }, function (err, user) {
                try {
                    let message;
                    if (user) {
                        message = "User with that email address already exists!";
                    } else {
                        users.insertOne({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        message = "User succesfully created";
                    }
                    res.status(201).json({ message: message })
                } catch (err) {
                    res.status(500).json("Server error!");
                }


            });
        });
    });
});
async function getUsers() {
    const client = await mongodb.MongoClient.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    return client.db("revizor-radar").collection("users");
}

module.exports = router;
