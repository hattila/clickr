/**
 * Created by hattila on 2016.04.21..
 */

Hw.Srvc.Game = Hw.Srvc.Game || (function(){

    /**
     * Properties
     */
    var _monsters = 10;

    var init = function ()
    {

        // var mob = Hw.Srvc.Spawner.spawnRandom();
        // $('#game-field').append(_getMonsterTmp(mob));

        Hw.Srvc.Spawner.spawnMonstersToAField($('#game-field'), 3, 200);

        /**
         * Subscribe demo
         */
        $.subscribe('/monster/dies', function(e, ele){
            
        });
    };

    return {
        init: init
    }
})();