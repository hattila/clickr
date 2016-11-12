
Hw.Srvc.MonsterMover = (function(){

    var _boardWidth = 600;
    var _boardHeight = 600;

    /**
     * Listen to events
     */
    var init = function () {
        $.subscribe('/monster/spawns', function (e, monster){
            _attachMonsterMover(monster);
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

        },1000);


    };

    return {
        init: init
    }
})();