
Hw.Enty.Monster = Hw.Enty.Monster || (function(name, hp, image){

    /**
     * Properties
     */
    var _hp, _maxHp;
    var _name;
    var _image;

    // TODO: validation
    _hp = _maxHp = hp;
    _name = name;
    _image = image;
        
    // var init = function (hp, name)
    // {
    //     _hp = _maxHp = hp;
    //     _name = name;
    // };

    var getName = function () {
        return _name;
    };
    var getImage = function () {
        return _image;
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
        getImage: getImage,
        getHp: getHp,
        getMaxHp: getMaxHp,
        
        recDamage: recDamage,
        recHeal: recHealing
    }
});