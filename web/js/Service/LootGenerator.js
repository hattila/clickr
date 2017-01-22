/**
 * LootGenerator Service
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
    var generateItem = function () {
        console.log(_baseItems);
    };

    return {
        loadBaseItems: loadBaseItems,
        generateItem: generateItem
    }
})();
