/**
 * LootGenerator Service
 * ItemFactory?
 *
 * Generate Lootable Items
 *  - on monster kill?
 *  - on level completion?
 */

Hw.Service.LootGenerator = (function () {

    /**
     * Container for the Item entities. See:
     *  - entities/item.js
     *
     * @type {Array}
     * @private
     */
    var _baseItems = [];
    var _startingGear = [];
    // var _itemTmp = $('#item-template').html();
    var _itemTmp = '<div id="item-{id}" class="inv-item {class_name} {rarity_name}"></div>';
    var _rarities = [
        {
            name: 'junk',
            chance: 20,
            extraProperties: 0
        },
        {
            name: 'normal',
            chance: 45,
            extraProperties: 0
        },
        {
            name: 'magical',
            chance: 20,
            extraProperties: 1
        },
        {
            name: 'rare',
            chance: 10,
            extraProperties: 2
        },
        {
            name: 'legendary',
            chance: 5,
            extraProperties: 3
        }
    ];

    var _currentGeneratedLoot = [];

    var loadBaseItems = function (callback) {
        $.ajax({
            url: '/items',
            method: 'GET',
            success: function (data) {
                _baseItems = data;

                callback();
            },
            error: function () {

            }
        });
    };

    /**
     * Generic item generator
     *
     * If no inbound properties are given, then a random item with a random rarity will be generated
     * If the item is specified (via an itemBase id), than it won't be random
     * If the rarity is specified, than it won't be random
     */
    var generateItem = function (id, rarity) {
        id = id || false;
        rarity = undefined !== rarity ? rarity : undefined;

        var baseItem = id ? _getBaseItemById(id) : _getRandomBaseItem();

        // random rarity based on chance
        if (undefined === rarity) {
            /**
             * 20 % to junk
             * 45 % to normal
             * 20 % to magical
             * 10 % to rare
             *  5 % to legendary
             */
            var proc = Math.floor(Math.random() * 101);

            var base = 0;
            $.each(_rarities, function (idx, e) {
                base += e.chance;
                if (proc < base) {
                    rarity = idx;
                    return false; // break
                }
            });
        }

        baseItem.rarity = rarity;

        return new Hw.Entity.Item(
            baseItem.name,
            baseItem.image,
            baseItem.type,
            rarity,
            _itemTmp,
            baseItem.effects // TODO: refine concrete generated effects based on the BaseItem's stat intervals
        );
    };

    /**
     * Generate Starting Gear
     *  - Could be different each time
     *  - Sometimes get better stuff?
     *
     * @returns {{Array}} InventoryMap
     */
    var getStartingGear = function () {
        // TODO: any logic to determine starting items

        return {
            hat: null,
            // armor: generateItem(5, 0),
            armor: null,
            trinket: null,
            left: null,
            right: generateItem(1, 1),
            0: generateItem(3, 0),
            1: generateItem(3, 1),
            2: generateItem(3, 2),
            3: generateItem(3, 3),
            4: generateItem(3, 4),
            5: generateItem(7, 0),
            6: generateItem(7, 1),
            7: generateItem(7, 2),
            8: generateItem(7, 3),
            9: generateItem(7, 4)
        };
    };

    var _getBaseItemById = function (id) {
        if (typeof id !== 'number') {
            return false;
        }
        for (var i = 0; i < _baseItems.length; i++) {
            if (_baseItems[i].id == id) {
                return _baseItems[i];
            }
        }
        return false;
    };

    var _getRandomBaseItem = function () {
        return _baseItems[Math.floor(Math.random() * (_baseItems.length))];
    };

    var generateLoot = function () {
        // the number of items
        var items = Math.floor(Math.random() * (2 - 1 + 1)) + 1; // 1 - 2

        var loot = [];
        for (var i = 0; i < items; i++) {
            loot.push(generateItem());
        }

        return loot;
    };

    return {
        loadBaseItems: loadBaseItems,
        getStartingGear: getStartingGear,
        generateItem: generateItem,
        generateLoot: generateLoot
    }
})();
