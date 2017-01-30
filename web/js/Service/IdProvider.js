
Hw.Service.IdProvider = (function(){

    var _monsterId = 0;
    var _itemId = 0;

    return {
        monster: {
            getNewId: function () {
                _monsterId++;
                return _monsterId;
            }
        },
        item: {
            getNewId: function () {
                _itemId++;
                return _itemId;
            }
        }
    }
})();
