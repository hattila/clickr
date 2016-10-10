
Hw.Enty.Monster = Hw.Enty.Monster || (function(name, hp){

    /**
     * Properties
     */
    var _hp, _maxHp;
    var _name;

    // TODO: validation
    _hp = _maxHp = hp;
    _name = name;
        
    // var init = function (hp, name)
    // {
    //     // TODO: validation
    //     _hp = _maxHp = hp;
    //     _name = name;
    // };

    var getName = function () {
        return _name;
    };
    var getHp = function () {
        return _hp;
    };
    var getMaxHp = function () {
        return _maxHp;
    };
        
    var recDamage = function (damage) {
        _hp = damage < _hp ? _hp - damage : 0;
        return _hp;
    };
    var recHealing = function (heal) {
        _hp = heal < _maxHp - _hp ? _hp + heal : _maxHp;
        return _hp;
    };

    return {
        // init: init,
        getName: getName,
        getHp: getHp,
        getMaxHp: getMaxHp,
        
        recDamage: recDamage,
        recHeal: recHealing
    }
});