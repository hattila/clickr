/**
 * Item (static)
 *
 * @type {Function}
 */
module.exports = (function () {

    var _items = [
        {
            id: 1,
            name: 'Revolver',
            type: 'weapon',
            image: 'image/items/weapons/pistol.jpg',
            damage: 5
        },
        {
            id: 2,
            name: 'Colt',
            type: 'weapon',
            image: 'image/items/weapons/colt_45.jpg',
            damage: 8
        },
        {
            id: 3,
            name: 'Shotgun',
            type: 'weapon',
            image: 'image/items/weapons/shotgun.jpg',
            damage: 15
        },
        {
            id: 4,
            name: 'Thomson',
            type: 'weapon',
            image: 'image/items/weapons/tommy.jpg',
            damage: 22
        },
        {
            id: 5,
            name: 'TrenchCoat',
            type: 'armor',
            image: 'image/items/armor/trench_coat.jpg',
            armor: 3
        },
        {
            id: 5,
            name: 'LeatherHat',
            type: 'armor',
            image: 'image/items/armor/leather_hat.jpg',
            armor: 1
        }
    ];

    var getAll = function () {
        return _items;
    };

    var getItemById = function (id) {
        if (typeof id !== 'number') {
            return false;
        }
        for (var i = 0; i < _items.length; i++) {
            if (_items[i].id == id) {
                return _items[i];
            }
        }
        return false;
    };

    return {
        getAll: getAll,
        getItemById: getItemById
    }
})();

