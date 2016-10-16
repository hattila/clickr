/**
 * Created by hattila on 2016.04.21..
 */

Hw.Srvc.Game = Hw.Srvc.Game || (function(){

    /**
     * Properties
     */
    var _monsters = 10;
    var _monsterSpawningActive = false;
    var _monsterTmp = $('#monster-template').html();

    var init = function ()
    {

        // var mob = Hw.Srvc.Spawner.spawnRandom();
        // $('#game-field').append(_getMonsterTmp(mob));

        _spawnMonstersToTheField(1, 1000);

        /**
         * Subscribe demo
         */
        $.subscribe('/monster/dies', function(e, ele){
            
        });
    };

    /**
     *
     * @param numberOfMonsters
     * @param interval [5000]
     */
    var _spawnMonstersToTheField = function (numberOfMonsters, interval) {
        interval = interval !== undefined ? interval : 5000;

        if (!_monsterSpawningActive) {
            _monsterSpawningActive = true;
            var idx = 0;

            var intervalVar = setInterval(function(){
                if (idx == numberOfMonsters) {
                    clearTimeout(intervalVar);
                    _monsterSpawningActive = false;
                } else {

                    try {
                        var mob = Hw.Srvc.Spawner.spawnRandom();
                        $('#game-field').append(_getMonsterTmp(mob));
                        idx++;
                    } catch(err) {
                        clearTimeout(intervalVar);
                        _monsterSpawningActive = false;

                        console.log(err.message);
                    }

                }
            }, interval);
        }

    };

    var _getMonsterTmp = function (monster) {
        var newTmp = _monsterTmp;
        
        console.log(monster.getName());
        
        newTmp = newTmp
            .replace('{maxHp}', monster.getMaxHp())
            .replace('{hp}', monster.getHp())
            .replace('{name}', monster.getName());
        

        newTmp = $.parseHTML(newTmp);
        // $(newTmp).children('.image').css({'background-image': monster.getImage()});
        $(newTmp).children('.image').attr('style', 'background-image: url(\'' + monster.getImage() + '\')');

        return newTmp;
    };

    return {
        init: init
    }
})();