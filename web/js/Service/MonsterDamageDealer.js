/**
 * Handles the Monsters damage dealing
 * Manage damage intervals
 */
Hw.Srvc.MonsterDamageDealer = (function(){

    var _damageIntervals = [];

    /**
     * Listen to events
     */
    var init = function () {
        $.subscribe('/monster/spawns', function (e, monster){
            _attachDamageDealer(monster);
        });

        $.subscribe('/monster/removed', function (e, monsterId){
            _clearDamageInterval(monsterId);
        });
    };

    /**
     *
     * @param monster Monster
     */
    var _attachDamageDealer = function (monster) {

        var damageInterval = setInterval(function () {
            console.log('A monster (%d) tries to deal damage, but it is not implemented yet.', monster.getId());
        },2000);

        _damageIntervals.push({
            id: monster.getId(),
            interval: damageInterval
        })

    };

    var _clearDamageInterval = function (monsterId) {
        var currentDamageIntervalIndex = _damageIntervals.findIndex(function(e){
            return e.id == monsterId;
        });

        clearInterval(_damageIntervals[currentDamageIntervalIndex].interval);

        _damageIntervals.splice(currentDamageIntervalIndex, 1);
    };

    var getDamageIntervals = function () {
        return _damageIntervals;
    };

    return {
        init: init,
        getDamageIntervals: getDamageIntervals
    }
})();