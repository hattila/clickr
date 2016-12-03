
Hw.Srvc.MonsterIdProvider = (function(){

    var _nextId = 0;

    /**
     * Listen to events
     */
    var init = function () {
        _nextId = 0;
    };

    /**
     * get a new Id for a monster
     */
    var getNewId = function () {
        _nextId++;
        return _nextId;
    };

    return {
        getNewId: getNewId
    }
})();
