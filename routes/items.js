var express = require('express');
var item = require('../entities/item');
var router = express.Router();

router.route('/')
    .get(function (req, res) {
        res.json(item.getAll());
    })
;

module.exports = router;
