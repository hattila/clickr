/**
 * Monster (static)
 *
 * @type {Function}
 */
module.exports = (function () {

    var _monsters = [
        {
            id: 1,
            name: 'Zombie',
            hp: [4, 5, 6],
            image: 'image/drawn_skeleton.jpg'
        },
        {
            id: 2,
            name: 'Bat',
            hp: [2, 3, 4],
            image: 'image/drawn_bat.jpg'
        },
        {
            id: 3,
            name: 'Warrior',
            hp: [7, 8],
            image: 'image/drawn_skeleton_warrior.jpg'
        }
    ];

    var getAll = function () {
        return _monsters;
    };

    var getMonsterById = function (id) {
        if (typeof id !== 'number') {
            return false;
        }
        for (var i = 0; i < _monsters.length; i++) {
            if (_monsters[i].id == id) {
                return _monsters[i];
            }
        }
        return false;
    };

    var getMonsterByName = function (name) {
        for (var i = 0; i < _monsters.length; i++) {
            if (_monsters[i].name == name) {
                return _monsters[i];
            }
        }
        return false;
    };

    return {
        getAll: getAll,
        getMonsterById: getMonsterById,
        getMonsterByName: getMonsterByName
    }
})();
