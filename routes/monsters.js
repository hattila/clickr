var express = require('express');
var monster = require('../entities/monster');
var router = express.Router();

router.route('/')
    .get(function (req, res) {
        res.json(monster.getAll());
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
        var foundMonster = monster.getMonsterByName(req.monsterName);

        if (foundMonster) {
            res.json(foundMonster);
        } else {
            res.status(404).json('Monster not found with name: ' + req.monsterName);
        }
    })
;

module.exports = router;
