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
            effects: {
                damage: 5
            }
        },
        {
            id: 2,
            name: 'Colt',
            type: 'weapon',
            image: 'image/items/weapons/colt_45.jpg',
            effects: {
                damage: 8
            }
        },
        {
            id: 3,
            name: 'Shotgun',
            type: 'weapon',
            image: 'image/items/weapons/shotgun.jpg',
            effects: {
                damage: 15
            }
        },
        {
            id: 4,
            name: 'Thomson',
            type: 'weapon',
            image: 'image/items/weapons/tommy.jpg',
            effects: {
                damage: 22
            }
        },
        {
            id: 5,
            name: 'TrenchCoat',
            type: 'armor',
            image: 'image/items/armor/trench_coat.jpg',
            effects: {
                armor: 3
            }
        },
        {
            id: 5,
            name: 'LeatherHat',
            type: 'hat',
            image: 'image/items/armor/leather_hat.jpg',
            effects: {
                armor: 1
            }
        },
        {
            id: 6,
            name: 'Trinket1',
            type: 'trinket',
            image: 'image/items/trinkets/bronze_amulet.jpg',
            effects: {
                stamina: 10
            }
        },
        {
            id: 7,
            name: 'Trinket2',
            type: 'trinket',
            image: 'image/items/trinkets/blue_amulet.jpg',
            effects: {
                sanity: 10
            }
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

