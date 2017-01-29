/**
 * Create Monsters
 */
Hw.Service.Spawner = (function(){

    /**
     * Container for the Monster entities. See:
     *  - entities/monster.js
     *
     * @type {Array}
     * @private
     */
    var _monsters = [];
    var _monsterTmp = $('#monster-template').html();
    var _monsterSpawningActive = false;
    var _monsterSpawningIntervalVar;
    var _monstersOnTheField = [];

    var loadMonsters = function (callback) {
        $.ajax({
            url: '/monsters',
            method: 'GET',
            success: function (data) {
                _monsters = data;

                callback();
            },
            error: function () {

            }
        });
    };

    /**
     * Spawn a given number of random Monsters to a specified field with an interval.
     *
     * @param field
     * @param numberOfMonsters
     * @param interval [5000]
     */
    var spawnMonstersToAField = function (field, numberOfMonsters, interval) {
        interval = interval !== undefined ? interval : 5000;

        if (!_monsterSpawningActive) {
            _monsterSpawningActive = true;
            var idx = 0;

            var _monsterSpawningIntervalVar = setInterval(function(){
                if (idx == numberOfMonsters) {
                    clearTimeout(_monsterSpawningIntervalVar);
                    _monsterSpawningActive = false;
                } else {

                    try {
                        var monster = _spawnRandomMonster();
                        $(field).append(monster.getMonsterHtml());

                        $.publish('/monster/spawns', monster);

                        idx++;
                    } catch(err) {
                        clearTimeout(_monsterSpawningIntervalVar);
                        _monsterSpawningActive = false;

                        console.log(err.message);
                    }

                }
            }, interval);
        } else {
            console.warn('Trying to spawn a new wave, but it is already spawning!');
        }

    };

    var trackMonstersOnTheField = function () {
        $.subscribe('/monster/spawns', function (e, monster) {
            _monstersOnTheField.push(monster);
        });

        $.subscribe('/monster/removed', function (e, monsterId) {
            var currentMonsterIndex = _monstersOnTheField.findIndex(function(e){
                return e.getId() == monsterId;
            });
            _monstersOnTheField.splice(currentMonsterIndex, 1);
        });
    };

    var getMonstersOnTheField = function () {
        return _monstersOnTheField;
    };

    /**
     * Remove every monster
     *  - stop spawning if it is in progress
     */
    var wipeField = function () {
        clearTimeout(_monsterSpawningIntervalVar);
        _monsterSpawningActive = false;

        var count = _monstersOnTheField.length;

        for (var i = 0; i < count; i++) {
            if (_monstersOnTheField[i]) {
                _monstersOnTheField[i].removeMonster();
            }
        }
        // TODO: omg szegyenteljes
        for (i = 0; i < count; i++) {
            if (_monstersOnTheField[i]) {
                _monstersOnTheField[i].removeMonster();
            }
        }
        // TODO: omg szegyenteljes
        for (i = 0; i < count; i++) {
            if (_monstersOnTheField[i]) {
                _monstersOnTheField[i].removeMonster();
            }
        }

    };


    /**
     * Instantiates a random Monster from the pool
     *
     * @returns Monster
     * @private
     */
    var _spawnRandomMonster = function () {
        var randomMonster = _monsters[Math.floor(Math.random() * (_monsters.length))];
        var hp = typeof randomMonster.hp === 'object' ?
            randomMonster.hp[Math.floor(Math.random() * (randomMonster.hp.length))] :
            randomMonster.hp;

        return new Hw.Enty.Monster(
            _monsterTmp,
            randomMonster.name,
            randomMonster.image,
            hp,
            randomMonster.damage
        );
    };

    return {
        loadMonsters: loadMonsters,
        trackMonstersOnTheField: trackMonstersOnTheField,
        getMonstersOnTheField: getMonstersOnTheField,
        spawnMonstersToAField: spawnMonstersToAField,
        wipeField: wipeField
    }
})();
