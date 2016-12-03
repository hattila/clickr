var express = require('express');
var router = express.Router();

var monsters = [
    {
        name: 'John',
        hp: 10
    },
    {
        name: 'Steve',
        hp: 12
    }
];

router.route('/')
    .get(function (req, res) {
        res.json({
            status: 'success',
            data: monsters
        });
    })
;

router.route('/:name')
    /**
     * Normalize incoming parameter
     */
    .all(function (req, res, next) {
        var name = req.params.name;
        req.monsterName = name[0].toUpperCase() + name.slice(1).toLowerCase();
        next();
    })
    .get(function (req, res) {
        for (var i = 0; i < monsters.length; i++) {
            if (monsters[i].name == req.monsterName) {
                res.json(monsters[i]);
                return false;
            }
        }

        res.status(404).json('Monster not found with name: ' + req.monsterName);
    })
;

module.exports = router;