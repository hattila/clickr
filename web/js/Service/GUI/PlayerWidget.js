
Hw.Service.PlayerWidget = (function(){

    var _$staminaBar = $('div#player div.profile-container div.curved-property.stamina div.bar');
    var _$sanityBar = $('div#player div.profile-container div.curved-property.sanity div.bar');

    var init = function () {
        $.subscribe('/player/stats/change', function (e, stats) {
            _$staminaBar.css({
                height: (stats.stamina / stats.maxStamina * 100) + '%'
            });

            console.log((stats.stamina / stats.maxStamina * 100) + '%');
        });
    };

    return {
        init: init
    }
})();

