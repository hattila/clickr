
Hw.Srvc.MonsterMover = (function(){

    var _boardWidth = 600;
    var _boardHeight = 600;

    var _moveIntervals = [];

    /**
     * Listen to events
     */
    var init = function () {
        $.subscribe('/monster/spawned', function (e, monster){
            _attachMonsterMover(monster);
        });

        $.subscribe('/monster/removed', function (e, monsterId){
            _clearMoveInterval(monsterId);
        });
    };

    /**
     *
     * @param monster Monster
     */
    var _attachMonsterMover = function (monster) {
        var mTop = monster.getTop();
        var mLeft = monster.getLeft();

        // TODO: clear interval when monster dies
        var moveInterval = setInterval(function () {
            var newTop = Math.floor(Math.random() * 500);
            var newLeft = Math.floor(Math.random() * 500);

            monster.setPosition(newTop, newLeft);
        },2000);

        _moveIntervals.push({
            id: monster.getId(),
            interval: moveInterval
        })

    };

    var _clearMoveInterval = function (monsterId) {
        var currentMoveIntervalIndex = _moveIntervals.findIndex(function(e){
            return e.id == monsterId;
        });

        clearInterval(_moveIntervals[currentMoveIntervalIndex].interval);

        _moveIntervals.splice(currentMoveIntervalIndex, 1);
    };

    var getMoveIntervals = function () {
        return _moveIntervals;
    };

    return {
        init: init,
        getMoveIntervals: getMoveIntervals
    }
})();