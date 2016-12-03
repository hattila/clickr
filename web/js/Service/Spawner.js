
Hw.Srvc.Spawner = Hw.Srvc.Spawner || (function(){

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

            var intervalVar = setInterval(function(){
                if (idx == numberOfMonsters) {
                    clearTimeout(intervalVar);
                    _monsterSpawningActive = false;
                } else {

                    try {
                        var monster = _spawnRandomMonster();
                        $(field).append(monster.getMonsterHtml());

                        $.publish('/monster/spawns', monster);

                        idx++;
                    } catch(err) {
                        clearTimeout(intervalVar);
                        _monsterSpawningActive = false;

                        console.log(err.message);
                    }

                }
            }, interval);
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
            hp
        );
    };

    return {
        loadMonsters: loadMonsters,
        spawnMonstersToAField: spawnMonstersToAField
    }
})();