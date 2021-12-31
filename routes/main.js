const express = require('express');

const router = express.Router();

const session = require('express-session');

router.use(express.json())
router.use(express.urlencoded({extended :true}));

let users = {"dummy":"123"};
let signMessage = "";
let logMessage = "";
let userLogged = "";

router.use(session({secret: "Secretive very", resave: false,
    saveUninitialized: true}))

router.get('/', (req, res) => {
    res.render("index", {auth: req.session.auth, users: users, userLogged: userLogged});
});

router.get('/login', (req, res) => {
    res.render("login", {message: logMessage});
    logMessage = "";
});

router.post('/login', async (req, res) => {
    if (req.body.attemptedName in users) {
        if (users[req.body.attemptedName] == req.body.attemptedPassword) {
            userLogged = req.body.attemptedName;
            req.session.auth = true;
            res.redirect("/");
        } else {
            logMessage = "Incorrect password 🚫🚫🚫";
            res.redirect("/login");
        } 
    } else {
        logMessage = "User not found 🚫🚫🚫";
        res.redirect("/login");
    }
});

router.get('/signup', (req, res) => {
    res.render("signup", {message: signMessage});
    signMessage = "";
});

router.post('/signup', async (req, res) => {
    if (req.body.passWord != req.body.confirmPassWord && req.body.userName in users) {
        signMessage = "Passwords do not match 🚫🚫🚫\nUsername not available 🚫🚫🚫";
        res.redirect("/signup");
    }  else if (req.body.passWord != req.body.confirmPassWord) {
        signMessage = "Passwords do not match 🚫🚫🚫";
        res.redirect("/signup");
    } else if (req.body.userName in users) {
        signMessage = "Username not available 🚫🚫🚫";
        res.redirect("/signup");
    } else {
        users[req.body.userName] =  req.body.passWord;
        res.redirect("/login");
    }

});

module.exports = router;
