
Hw.Entity.Player = (function(){

    /**
     * BaseDamage
     *
     * @type {number}
     * @private
     */
    var _damage = 1;
    var _stamina = 100;
    var _maxStamina = 100;
    var _sanity = 100;
    var _maxSanity = 100;
    var _armor = 0;
    var _level = 1;
    var _xp = 0;

    var _bonus = {
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
    var recHealing = function (heal) {
        _stamina = heal < _maxStamina - _stamina ? _stamina + heal : _maxStamina;
        _updateStamina();
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
    var recSanityHealing = function (heal) {
        _sanity = heal < _maxSanity - _sanity ? _sanity + heal : _maxSanity;
        _updateSanity();
        return _sanity;
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
            _damage++;
            _updateDamage();
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

    var _updateArmor = function () {
        _$stats.armor.text(_armor);
    };

    var _updateLevel = function () {
        _$stats.level.text(_level);
    };

    var _updateXp = function () {
        _$stats.xp.text(_xp);
    };

    var _applyItemBonuses = function (items) {
        console.log('Should apply equipped item effects');
    };

    var _setupEventListeners = function () {
        // TODO: get a Monster Entity and get/calc the xp given by it.
        $.subscribe('/monster/dies', function (e, monsterId) {
            _awardXp();
        });

        $.subscribe('/inventory/equippedItems/change', function (e, itemMap) {
            _applyItemBonuses(itemMap);
        });
    };

    _setupEventListeners();

    return {
        getDamage: getDamage,

        recDamage: recDamage,
        recHealing: recHealing,
        recSanityDamage: recSanityDamage,
        recSanityHealing: recSanityHealing
    }
});
