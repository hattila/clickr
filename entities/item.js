/**
 * Item (static)
 *
 * @type {Function}
 */
module.exports = (function () {

    var _items = [
        {
            id: 1,
            name: 'Revolver'
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

