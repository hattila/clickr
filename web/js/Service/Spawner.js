
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

    var spawnRandom = function () {
        var name = _monsterNames[Math.floor(Math.random() * (_monsterNames.length - 1))];
        var hp = Math.floor(Math.random() * 6 + 5); // 5..10

        return new Hw.Enty.Monster(name, hp);
    };

    return {
        spawnRandom: spawnRandom
    }
})();