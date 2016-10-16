
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
        _updateHealth();
        return _hp;
    };
    var recHealing = function (heal) {
        _hp = heal < _maxHp - _hp ? _hp + heal : _maxHp;
        _updateHealth();
        return _hp;
    };

    var getMonsterHtml = function () {
        console.log(getName());

        _template = _template
            .replace(/{maxHp}/g, getMaxHp())
            .replace(/{hp}/g, getHp())
            .replace('{name}', getName());


        _template = $.parseHTML(_template);
        // $(newTmp).children('.image').css({'background-image': getImage()});

        var style = 'top: ' + _top + 'px; left: ' + _left + 'px;';
        var imageStyle = 'background-image: url(\'' + getImage() + '\');';

        $(_template).attr('style', style);
        $(_template).children('.image').attr('style', imageStyle);

        $(_template).children('.hit-box').click(function(){
            recDamage(Player.getDamage());
        });
        
        return _template;
    };

    var _updateHealth = function () {
        $(_template).data('health', _hp);
        $(_template).children('.health-bar-container').children('.health-bar').css({width: (_hp / _maxHp * 100) + '%'});
        $(_template).children('.health-bar-container').children('.health').text(_hp + ' / ' + _maxHp);
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