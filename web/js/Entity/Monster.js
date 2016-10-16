
Hw.Enty.Monster = Hw.Enty.Monster || (function(template, name, image, hp){

    /**
     * Properties
     */
    var _hp, _maxHp;
    var _name;
    var _image;
    var _template;
    var _top, _left;
        
    // TODO: validation
    _hp = _maxHp = hp;
    _name = name;
    _image = image;
    _template = template;
    _top = Math.floor(Math.random() * 500);
    _left = Math.floor(Math.random() * 500);

        
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

    var getMonsterHtml = function () {
        var newTmp = _template;

        console.log(getName());

        newTmp = newTmp
            .replace('{maxHp}', getMaxHp())
            .replace('{hp}', getHp())
            .replace('{name}', getName());


        newTmp = $.parseHTML(newTmp);
        // $(newTmp).children('.image').css({'background-image': getImage()});

        var style = 'top: ' + _top + 'px; left: ' + _left + 'px;';
        var imageStyle = 'background-image: url(\'' + getImage() + '\');';

        $(newTmp).attr('style', style);
        $(newTmp).children('.image').attr('style', imageStyle);

        return newTmp;
    };
        
    return {
        // init: init,
        getName: getName,
        getImage: getImage,
        getHp: getHp,
        getMaxHp: getMaxHp,
        
        recDamage: recDamage,
        recHeal: recHealing,
        getMonsterHtml: getMonsterHtml
    }
});