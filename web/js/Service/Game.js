/**
 * Created by hattila on 2016.04.21..
 */

Hw.Srvc.Game = Hw.Srvc.Game || (function(){

    /**
     * Properties
     */
    var _levels = [
        {
            id: 1,
            name: 'Forest',
            background: 'image/level_backgrounds/forest.jpg',
            monsterCount: 12,
            monstersPerWave: 2,
            timer: 31
        },
        {
            id: 2,
            name: 'Cemetery',
            background: 'image/level_backgrounds/cemetery.jpg',
            monsterCount: 18,
            monstersPerWave: 3,
            timer: 36
        },
        {
            id: 3,
            name: 'Village',
            background: 'image/level_backgrounds/village.jpg',
            monsterCount: 27,
            monstersPerWave: 3,
            timer: 51
        }
    ];

    var _currentLevelIdx = 0;

    var _$gameField = $('#game-field');

    var init = function ()
    {
        Hw.Srvc.MonsterMover.init();

        Hw.Srvc.Spawner.trackMonstersOnTheField();

        Hw.Srvc.Spawner.loadMonsters(function(){
            _initLevel(_currentLevelIdx);
        });
    };

    var _initLevel = function (idx) {
        var level = _levels[idx];
        if (level) {
            var monstersKilled = 0;
            var waves = Math.ceil(level.monsterCount / level.monstersPerWave);

            _$gameField.css({
                backgroundImage: 'url(' + level.background + ')'
            });

            /**
             * Start Timer
             */
            Hw.Srvc.Timer.reset(level.timer * 1000);

            Hw.Srvc.Spawner.spawnMonstersToAField(_$gameField, level.monstersPerWave, 800);
            var wave = 2;

            var levelWaveInterval = setInterval(function () {
                if (wave <= waves) {
                    Hw.Srvc.Spawner.spawnMonstersToAField(_$gameField, level.monstersPerWave, 800);
                    wave++;
                } else {
                    console.log('Levels monsters have spawned. Clearing wave interval.');
                    clearInterval(levelWaveInterval);
                }
            }, 4000);

            $.subscribe('/monster/dies', function(e, monsterId){
                monstersKilled++;

                if (monstersKilled == level.monsterCount) {
                    // win condition
                    console.log('All monsters killed, moving on ...');

                    Hw.Srvc.Timer.pause();

                    if (_currentLevelIdx + 1 == _levels.length) {
                        $('#ultimate-message')
                            .html('You win.')
                            .removeClass('bad')
                            .addClass('good')
                            .fadeIn(200);
                    }

                    setTimeout(function () {
                        _currentLevelIdx++;
                        _initLevel(_currentLevelIdx);
                    }, 2000);
                }
            });

            $.subscribe('/timer/expired', function () {
                // loose condition
                console.log('You have lost.');
                $('#ultimate-message')
                    .html('You have lost.')
                    .removeClass('good')
                    .addClass('bad')
                    .fadeIn(200);

                clearInterval(levelWaveInterval);
                Hw.Srvc.Spawner.wipeField();

            });
        }
    };

    return {
        init: init
    }
})();