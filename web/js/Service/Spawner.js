
Hw.Srvc.Spawner = Hw.Srvc.Spawner || (function(){

    var _monsterNames = [
        'Willy',
        'Donna',
        'George',
        'Sam',
        'Mark',
        'Hugo',
        'Abigail',
        'Haily',
        'Sebastian',
        'Tamara',
        'Joel',
        'Carla'
    ];

    var _monsterImages = [
        'image/drawn_bat.jpg',
        'image/drawn_skeleton.jpg',
        'image/drawn_skeleton_warrior.jpg'
    ];

    var _monsterTmp = $('#monster-template').html();

    var _monsterSpawningActive = false;

    /**
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
        
    var _spawnRandomMonster = function () {
        var name = _monsterNames[Math.floor(Math.random() * (_monsterNames.length))];
        var hp = Math.floor(Math.random() * 6 + 5); // 5..10
        var image = _monsterImages[Math.floor(Math.random() * (_monsterImages.length))];
        
        return new Hw.Enty.Monster(_monsterTmp, name, image, hp);
    };

    return {
        spawnMonstersToAField: spawnMonstersToAField
    }
})();