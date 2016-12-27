
Hw.Enty.Player = Hw.Enty.Player || (function(){

    /**
     * BaseDamage
     *
     * @type {number}
     * @private
     */
    var _basedamage = 1;
    var _stamina = 100;
    var _sanity = 100;
    var _xp = 0;
    var _level = 1;

    var _statsContainerId = 'stats';
    var _$stats = {
        damage: $('#' + _statsContainerId + ' .damage'),
        stamina: $('#' + _statsContainerId + ' .stamina'),
        sanity: $('#' + _statsContainerId + ' .sanity'),
        xp: $('#' + _statsContainerId + ' .xp'),
    };

    var getDamage = function () {
        return _basedamage;
    };

    /**
     * Player receives damage
     */
    var recDamage = function (damage) {
        _stamina = damage < _stamina ? _stamina - damage : 0;
        _updateStat('stamina', _stamina);

        if (0 === _stamina) {
            $.publish('/player/dies');
        }

        return _stamina;
    };

    var _updateStat = function (stat, val) {
        if ('undefined' === typeof _$stats[stat]) {
            console.warn('Stat does not exist on Player: ' + stat);
            return false;
        }
        _$stats[stat].text(val);
        return val;
    };

    return {
        getDamage: getDamage
    }
});
