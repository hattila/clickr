
Hw.Enty.Monster = Hw.Enty.Monster || (function(template, name, image, hp){

    /**
     * Properties
     */
    var _hp, _maxHp;
    var _name;
    var _image;
    var _template;
    var _top, _left;

    var _domElement;

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
    var getTop = function () {
        return _top;
    };
    var getLeft = function () {
        return _left;
    };

    var setPosition = function (top, left) {
        _top = top;
        _left = left;

        var style = 'top: ' + _top + 'px; left: ' + _left + 'px;';
        $(_template).attr('style', style);
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
        // console.log(getName());

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

        var barWidth = _hp / _maxHp * 100;
        var bgColor = '#00bb00';
        if (barWidth <= 75 && barWidth > 50) {
            bgColor = '#bbbb00';
        } else if (barWidth <= 50 && barWidth > 25) {
            bgColor = '#ff5500';
        } else if (barWidth <= 25) {
            bgColor = '#bb0000';
        }

        $(_template).children('.health-bar-container').children('.health-bar').css({
            width: (_hp / _maxHp * 100) + '%',
            backgroundColor: bgColor
        });
        $(_template).children('.health-bar-container').children('.health').text(_hp + ' / ' + _maxHp);
    };
        
    return {
        // init: init,
        getName: getName,
        getImage: getImage,
        getHp: getHp,
        getMaxHp: getMaxHp,
        getTop: getTop,
        getLeft: getLeft,

        setPosition: setPosition,

        recDamage: recDamage,
        recHeal: recHealing,
        getMonsterHtml: getMonsterHtml
    }
});