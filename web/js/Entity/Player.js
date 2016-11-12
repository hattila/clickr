
Hw.Enty.Player = Hw.Enty.Player || (function(){

    /**
     * BaseDamage
     *
     * @type {number}
     * @private
     */
    var _basedamage = 1;

    var getDamage = function () {
        return _basedamage;
    };

    return {
        getDamage: getDamage
    }
});
