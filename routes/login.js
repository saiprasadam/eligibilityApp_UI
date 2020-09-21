var express = require('express');
var router = express.Router();
var axios = require("axios");
const { LOGIN_SERVICE_URL } = require("../helpers/constants");
const logger = require("../helpers/logger");


router.get('/', (req, res) => {
    logger.info("Login Page requested");
    res.render('login.ejs');
});

router.post('/validate', (req, res) => {
    logger.info("Validate page requested");
    var errormessage = 'Invalid Username/password';
    let url = LOGIN_SERVICE_URL + `?name=${req.body.username}`;

    axios.get(url).then(function (response) {
        logger.info("Fetching user details from: " + url);
        const status = response.status;
        if (status != 200) {
            logger.error("Status is not 200");
            logger.error("Error message: " + response.data);
            throw Error("Unable to continue, status received: " + status);
        }
        const data = response.data;
        req.session.username = data.name;
        req.session.userid = data.id;
        if (data.name == req.body.username && data.password == req.body.password) {
            logger.info("Successfully authenticated username: " + data.name);
            res.redirect('/oauth');
        }
        else {
            logger.info("Unable to log in username: " + data.name);
            res.render('login.ejs', { errormessage: errormessage });
        }
    }).catch(function (error) {
        logger.error(`Error: ${error.message}`);

    });
});

module.exports = router;