
Hw.Service.PlayerWidget = (function(){

    var _$staminaBar = $('div#player div.profile-container div.curved-property.stamina div.bar');
    var _$staminaMax = $('div#player div.profile-container div.curved-property.stamina div.maxValue');
    var _$stamina = $('div#player div.profile-container div.curved-property.stamina div.value');

    var _$sanityBar = $('div#player div.profile-container div.curved-property.sanity div.bar');

    var init = function () {

        /**
         * @param player Object of player stats bonuses and the currently changed stat
         *
         *  player.stats
         *  player.bonuses
         *  player.statChanged
         */
        $.subscribe('/player/stats/change', function (e, player) {
            console.log('player widget drawing bars, changed stat: ', player);

            if (player.statChanged === 'stamina') {
                _$staminaBar.css({
                    // height: (player.stats.stamina / player.stats.maxStamina * 100) + '%'
                    height: (Player.getStamina() / Player.getMaxStamina() * 100) + '%'
                });

                _$stamina.html(Player.getStamina());
                _$staminaMax.html(Player.getMaxStamina());
            }

            if (player.statChanged === 'sanity') {
                _$sanityBar.css({
                    height: (player.stats.sanity / player.stats.maxSanity * 100) + '%'
                });
            }


        });
    };

    return {
        init: init
    }
})();

