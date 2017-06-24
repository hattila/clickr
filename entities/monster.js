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
            hp: [10, 15],
            image: 'image/drawn_skeleton.jpg',
            damage: {
                stamina: 2,
                sanity: 0
            }
        },
        {
            id: 2,
            name: 'Bat',
            hp: [6, 8],
            image: 'image/drawn_bat.jpg',
            damage: {
                stamina: 1,
                sanity: 0
            }
        },
        {
            id: 3,
            name: 'Warrior',
            hp: [18, 25],
            image: 'image/drawn_skeleton_warrior.jpg',
            damage: {
                stamina: 3,
                sanity: 1
            }
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
