
Hw.Enty.Player = Hw.Enty.Player || (function(){

    /**
     * BaseDamage
     *
     * @type {number}
     * @private
     */
    var _basedamage = 1;
    var _damage = _basedamage;
    var _stamina = 100;
    var _sanity = 100;
    var _xp = 0;
    var _level = 1;

    var _statsContainerId = '#stats';
    var _$stats = {
        damage: $(_statsContainerId + ' .damage'),
        stamina: $(_statsContainerId + ' .stamina'),
        sanity: $(_statsContainerId + ' .sanity'),
        xp: $(_statsContainerId + ' .xp')
    };

    var getBaseDamage = function () {
        return _basedamage;
    };

    var getDamage = function () {
        return _damage;
    };

    /**
     * Player receives damage
     *
     * @param damage
     * @returns {number}
     */
    var recDamage = function (damage) {
        _stamina = damage < _stamina ? _stamina - damage : 0;
        _updateStamina();

        if (0 === _stamina) {
            $.publish('/player/dies');
        }

        return _stamina;
    };

    /**
     * Player receives Sanity damage
     *
     * @param damage
     * @returns {number}
     */
    var recSanityDamage = function (damage) {
        _sanity = damage < _sanity ? _sanity - damage : 0;
        _updateSanity();

        if (0 === _sanity) {
            $.publish('/player/goesInsane');
        }

        return _sanity;
    };

    /**
     * One function to handle all the property DOM updates
     *
     * @param stat
     * @returns {boolean}
     * @private
     */
    var _updateStat = function (stat) {
        if ('undefined' === typeof _$stats[stat]) {
            console.warn('Stat does not exist on Player: ' + stat);
            return false;
        }
        // Cannot access the private property
        // dynamic variable?
        _$stats[stat].text(Player['_' + stat]);
        return true;
    };

    var _updateDamage = function () {
        _$stats.damage.text(_damage);
    };

    var _updateStamina = function () {
        _$stats.stamina.text(_stamina);
    };

    var _updateSanity = function () {
        _$stats.sanity.text(_sanity);
    };

    var _updateXp = function () {
        _$stats.xp.text(_xp);
    };


    return {
        getBaseDamage: getBaseDamage,
        getDamage: getDamage,

        recDamage: recDamage,
        recSanityDamage: recSanityDamage
    }
});
