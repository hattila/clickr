
Hw.Entity.Player = (function(){

    var _stats = {
        stamina: 100,
        maxStamina: 100,
        sanity: 100,
        maxSanity: 100,
        damage: 1,
        armor: 0
    };

    var _level = 1;
    var _xp = 0;

    var _bonuses = {
        damage: 0,
        stamina: 0,
        sanity: 0,
        armor: 0
    };

    var _statsContainerId = '#stats';
    var _$stats = {
        damage: $(_statsContainerId + ' .damage'),
        stamina: $(_statsContainerId + ' .stamina'),
        sanity: $(_statsContainerId + ' .sanity'),
        armor: $(_statsContainerId + ' .armor'),
        level: $(_statsContainerId + ' .level'),
        xp: $(_statsContainerId + ' .xp')
    };

    var getStamina = function () {
        return _stats.stamina;
    };

    var getMaxStamina = function () {
        return _stats.maxStamina + _bonuses.stamina;
    };

    var getSanity = function () {
        return _stats.sanity;
    };

    var getMaxSanity = function () {
        return _stats.maxSanity + _bonuses.sanity;
    };

    var getDamage = function () {
        return _stats.damage + _bonuses.damage;
    };

    var getArmor = function () {
        return _stats.armor + _bonuses.armor;
    };

    /**
     * Player receives damage
     *
     * @param damage
     * @returns {number}
     */
    var recDamage = function (damage) {
        _stats.stamina = damage < _stats.stamina ? _stats.stamina - damage : 0;
        _updateStat('stamina');

        if (0 === _stats.stamina) {
            $.publish('/player/dies');
        }

        return _stats.stamina;
    };
    var recHealing = function (heal) {
        _stats.stamina = heal < _stats.maxStamina - _stats.stamina ? _stats.stamina + heal : _stats.maxStamina;
        _updateStat('stamina');
        return _stats.stamina;
    };

    /**
     * Player receives Sanity damage
     *
     * @param damage
     * @returns {number}
     */
    var recSanityDamage = function (damage) {
        _stats.stanity = damage < _stats.stanity ? _stats.stanity - damage : 0;
        _updateStat('sanity');

        if (0 === _stats.stanity) {
            $.publish('/player/goesInsane');
        }

        return _stats.stanity;
    };
    var recSanityHealing = function (heal) {
        _stats.stanity = heal < _stats.maxSanity - _stats.stanity ? _stats.stanity + heal : _stats.maxSanity;
        _updateStat('sanity');
        return _stats.stanity;
    };

    var resetPlayerStats = function () {
        _stats.stamina = _stats.maxStamina;
        _updateStat('stamina');
        _stats.sanity = _stats.maxSanity;
        _updateStat('sanity');
    };

    var getBonuses = function () {
        return _bonuses;
    };

    /**
     * Increase Player experience
     * If the xp cap is reached then level up.
     * TODO: Handle xp required for a given level
     *
     * @param xp
     * @returns {{level: number, xp: number}}
     * @private
     */
    var _awardXp = function (xp) {
        xp = xp || 1;

        _xp += xp;

        if (_xp >= 10) {
            _level += 1;
            _updateLevel();
            _stats.damage++;
            _updateStat('damage');
            _xp = _xp - 10;

            Materialize.toast("Level Up! Damage increased", 4000);
        }

        _updateXp();

        return {
            level: _level,
            xp: _xp
        }
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

        _$stats[stat].text(_stats[stat] + _bonuses[stat]);

        $.publish('/player/stats/change', _stats);

        return true;
    };

    var _updateLevel = function () {
        _$stats.level.text(_level);
    };

    var _updateXp = function () {
        _$stats.xp.text(_xp);
    };

    /**
     * @param items Object of the equipped items. Slot name is the key, the Item is the value
     * @private
     */
    var _applyItemBonuses = function (items) {

        // TODO: better way without duplicating the bonuses object?
        var _equippedEffects = {
            damage: 0,
            stamina: 0,
            sanity: 0,
            armor: 0
        };
        
        $.each(items, function (key, item) {
            if (item !== null) {

                /**
                 * cumulate all the equipped effects, because multiple items can have the same effect, and we want
                 * to update the them once
                 */
                $.each(item.getEffects(), function (effect, value) {
                    if (_equippedEffects.hasOwnProperty(effect)) {
                        _equippedEffects[effect] += value;
                    }
                });
            }
        });

        $.each(_bonuses, function (bonus, value) {
            console.log(bonus, value);
            if (_stats.hasOwnProperty(bonus) && _equippedEffects[bonus] !== _bonuses[bonus]) {
                // equipped effects rewrite the current bonuses
                _bonuses[bonus] = _equippedEffects[bonus];
                _updateStat(bonus);
            }
        });
    };

    var _setupEventListeners = function () {
        // TODO: get a Monster Entity and get/calc the xp given by it.
        $.subscribe('/monster/dies', function (e, monsterId) {
            _awardXp();
        });

        $.subscribe('/inventory/equippedItems/change', function (e, equippedItems) {
            _applyItemBonuses(equippedItems);
        });
    };

    _setupEventListeners();

    return {
        getStamina: getStamina,
        getMaxStamina: getMaxStamina,
        getSanity: getSanity,
        getMaxSanity: getMaxSanity,
        getDamage: getDamage,
        getArmor: getArmor,

        recDamage: recDamage,
        recHealing: recHealing,
        recSanityDamage: recSanityDamage,
        recSanityHealing: recSanityHealing,
        resetPlayerStats: resetPlayerStats,
        getBonuses: getBonuses
    }
});
