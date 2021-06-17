const express = require('express');
const router = express.Router();


// ROUTES

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/*', function(req, res, next) {
    res.redirect('/')
});

module.exports = router;