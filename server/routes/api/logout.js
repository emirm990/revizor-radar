const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send({ message: err });
        }
        res.clearCookie(SESS_NAME);
        res.status(200).send({ message: "Logout" })
    })
});

module.exports = router;
