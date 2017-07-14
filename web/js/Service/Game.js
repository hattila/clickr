/**
 * Control the Game flow
 *
 * @type {{init}}
 */
Hw.Service.Game = (function(){

    /**
     * Properties
     */
    var _levels = [
        {
            id: 1,
            name: 'Forest',
            background: 'image/level_backgrounds/forest.jpg',
            monsterCount: 12, // 12
            monstersPerWave: 2,
            timer: 31,
            waveTimer: 2450,
            delayInWave: 800
        },
        {
            id: 2,
            name: 'Cemetery',
            background: 'image/level_backgrounds/cemetery.jpg',
            monsterCount: 18,
            monstersPerWave: 3,
            timer: 36,
            waveTimer: 3000,
            delayInWave: 600
        },
        {
            id: 3,
            name: 'Village',
            background: 'image/level_backgrounds/village.jpg',
            monsterCount: 27,
            monstersPerWave: 3,
            timer: 51,
            waveTimer: 4000,
            delayInWave: 500
        }
    ];

    var _currentLevelIdx = 0;

    var _$gameField = $('#game-field');

    var init = function ()
    {
        Hw.Service.MonsterMover.init();
        Hw.Service.MonsterDamageDealer.init();

        Hw.Service.Spawner.trackMonstersOnTheField();

        Hw.Service.LootGenerator.loadBaseItems(function(){
            Hw.Service.InventoryHandler.setupInventory(Hw.Service.LootGenerator.getStartingGear());
        });

        Hw.Service.Spawner.loadMonsters(function(){
            // _initLevel(_currentLevelIdx);
        });

        Hw.Service.PlayerWidget.init();
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
            Hw.Service.Timer.reset(level.timer * 1000);

            Hw.Service.Spawner.spawnMonstersToAField(_$gameField, level.monstersPerWave, level.delayInWave);
            var wave = 2;

            var levelWaveInterval = setInterval(function () {

                if (wave <= waves) {
                    Hw.Service.Spawner.spawnMonstersToAField(_$gameField, level.monstersPerWave, level.delayInWave);
                    wave++;
                } else {
                    // console.log('Levels monsters have spawned. Clearing wave interval.');
                    clearInterval(levelWaveInterval);
                }
            }, level.waveTimer);

            $.subscribe('/monster/dies', function(e, monsterId){
                monstersKilled++;

                if (monstersKilled === level.monsterCount) {
                    // win condition
                    // console.log('All monsters killed, moving on ...');
                    _levelCompleted(level);
                }
            });

            // loose conditions
            $.subscribe('/timer/expires', function () {
                clearInterval(levelWaveInterval);
                _levelFailed();
            });

            $.subscribe('/player/dies', function () {
                Hw.Service.Timer.pause();
                clearInterval(levelWaveInterval);
                _levelFailed();
            });

            $.subscribe('/player/goesInsane', function () {
                Hw.Service.Timer.pause();
                clearInterval(levelWaveInterval);
                _levelFailed();
            });

        }
    };

    var _levelCompleted = function () {

        var loot = Hw.Service.LootGenerator.generateLoot();

        var menu = {
            title: 'Level Complete!',
            content: $.parseHTML(
                $('#menu-mid-level').html()
                    .replace('{monsters_killed}', 'x')
                    .replace(/{time_left}/g, 0)
                    .replace(/{click_accuracy}/g, 0)
            ),
            actions: [
                {
                    title: 'Take the Loot!',
                    action: function () {
                        console.log('Implementation underway');
                    }
                },
                {
                    title: 'Next level',
                    action: function () {
                        Hw.Service.IngameMenu.close();
                        _initLevel(_currentLevelIdx);
                    }
                }
            ]
        };

        Hw.Service.Timer.pause();

        if (_currentLevelIdx + 1 === _levels.length) {
            menu.title = 'Game Completed!';
            menu.actions = [];
        }

        _currentLevelIdx++;

        Hw.Service.IngameMenu.open(menu, function () {
            $.each(loot, function(k, item) {
                $('#ingame-menu .loot').append(item.getDomObject());
            });
            $.each($('#ingame-menu .loot .inv-item'), function(k, item) {
                $(item).click(function () {
                    Hw.Service.InventoryHandler.addItemToInventory(loot[k]);
                });
            });
        });
    };

    var _levelFailed = function () {
        // console.log('You have lost.');

        var menu = {
            title: 'Level Failed!',
            actions: [
                {
                    title: 'Restart level',
                    action: function () {
                        Hw.Service.IngameMenu.close();
                        _initLevel(_currentLevelIdx);
                        Player.resetPlayerStats();
                    }
                }
            ]
        };

        Hw.Service.Spawner.wipeField();
        Hw.Service.IngameMenu.open(menu);
    };

    return {
        init: init
    }
})();
