
Hw.Service.PlayerWidget = (function(){

    var _$staminaBar = $('div#player div.profile-container div.curved-property.stamina div.bar');
    var _$sanityBar = $('div#player div.profile-container div.curved-property.sanity div.bar');

    var init = function () {
        $.subscribe('/player/stats/change', function (e, stats) {

            console.log('player widget drawing bars');

            _$staminaBar.css({
                height: (stats.stamina / stats.maxStamina * 100) + '%'
            });

            _$sanityBar.css({
                height: (stats.sanity / stats.maxSanity * 100) + '%'
            });

        });
    };

    return {
        init: init
    }
})();

