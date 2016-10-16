
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

    var spawnRandom = function () {
        var name = _monsterNames[Math.floor(Math.random() * (_monsterNames.length - 1))];
        var hp = Math.floor(Math.random() * 6 + 5); // 5..10
        var image = _monsterImages[Math.floor(Math.random() * (_monsterImages.length - 1))];
        
        return new Hw.Enty.Monster(name, hp, image);
    };

    return {
        spawnRandom: spawnRandom
    }
})();