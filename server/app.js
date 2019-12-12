const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
global.SESS_NAME = 'sid';
let isAuth = false;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: "supersecretcookie",
    cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: true,
        secure: false
    }
}));
app.use((req, res, next) => {
    const user = req.session.user;
    if (user) {
        isAuth = true;
    }
    next();
});
const port = process.env.PORT || 3000;

const stopsilidza = require("./routes/api/stopsilidza");
const stopsbascarsija = require("./routes/api/stopsbascarsija");
const news = require("./routes/api/news");
const auth = require("./routes/api/auth");
const logout = require("./routes/api/logout");
app.use("/api/stopsilidza", stopsilidza);
app.use("/api/stopsbascarsija", stopsbascarsija);
app.use("/api/news", news);
app.use("/api/auth", auth);
app.use("/api/logout", logout);
app.listen(port, () => console.log(`Sever is started on port ${port}`));
