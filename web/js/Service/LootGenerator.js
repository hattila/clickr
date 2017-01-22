/**
 * LootGenerator Service
 * ItemFactory?
 *
 * Generate Lootable Items
 *  - on monster kill?
 *  - on level completion?
 */

Hw.Srvc.LootGenerator = (function(){

    /**
     * Container for the Item entities. See:
     *  - entities/item.js
     *
     * @type {Array}
     * @private
     */
    var _baseItems = [];
    var _startingGear = [];
    var _itemTmp = $('#item-template').html();

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
     * Generic item generator, can give anything.
     */
    var generateItem = function (id, rarity) {
        id = id || false;
        rarity = rarity || false;

        var baseItem = id ? _getBaseItemById(id) : _getRandomBaseItem();

        if (!rarity) {
            /**
             *  5 % to legendary
             * 10 % to rare
             * 20 % to magical
             * 45 % to normal
             * 20 % to junk
             */
            rarity = 1;
        }

        baseItem.rarity = rarity;

        var item = new Hw.Enty.Item(
            baseItem.name,
            baseItem.image,
            baseItem.type,
            rarity,
            _itemTmp,
            baseItem
        );

        return item;
    };

    /**
     * Generate Starting Gear
     *  - Could be different each time
     *  - Sometimes get better stuff?
     */
    var getStartingGear = function () {
        // TODO: any logic to determine starting items

        return [
            generateItem(1)
        ];
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

    return {
        loadBaseItems: loadBaseItems,
        getStartingGear: getStartingGear,
        generateItem: generateItem
    }
})();
