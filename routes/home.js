var express = require('express');
var router = express.Router();
var axios = require("axios");
var session = require('express-session');
const logger = require("../helpers/logger");

router.get('/', (req, res) => {
    logger.info("home Page requested");
    res.render('homepage.ejs',{username: req.session.username});
});

module.exports = router;