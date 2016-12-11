
Hw.Enty.Monster = Hw.Enty.Monster || (function(template, name, image, hp){

    /**
     * Properties
     */
    var _id = Hw.Srvc.MonsterIdProvider.getNewId();
    var _hp, _maxHp;
    var _name;
    var _image;
    var _template;
    var _top, _left;

    var _canPublishDeath = true;

    // TODO: validation
    _hp = _maxHp = hp;
    _name = name;
    _image = image;
    _template = template;
    _top = Math.floor(Math.random() * 500);
    _left = Math.floor(Math.random() * 500);

    var getId = function () {
        return _id;
    };
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

        if (0 === _hp && _canPublishDeath) {
            _canPublishDeath = false;
            removeMonster();

            $.publish('/monster/dies', _id);
        }

        return _hp;
    };
    var recHealing = function (heal) {
        _hp = heal < _maxHp - _hp ? _hp + heal : _maxHp;
        _updateHealth();
        return _hp;
    };

    var getMonsterHtml = function () {
        _template = _template
            .replace('{id}', _id)
            .replace(/{maxHp}/g, getMaxHp())
            .replace(/{hp}/g, getHp())
            .replace('{name}', getName());

        _template = $.parseHTML(_template);

        setPosition(_top, _left);

        var imageStyle = 'background-image: url(\'' + getImage() + '\');';
        $(_template).children('.hit-box').attr('style', imageStyle);

        /**
         * Processing the click on the "mousedown" is quicker and more
         * responsive than "click", which triggers on mouse up
         */
        $(_template).children('.hit-box').mousedown(function () {
            recDamage(Player.getDamage());

            var self = $(this);
            self.css({
                opacity: 0.9
            });
            setTimeout(function () {
                self.css({
                    opacity: 1
                });
            }, 50);
        });

        $(_template).children('.hit-box').click(function(){

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

    var removeMonster = function () {
        $.publish('/monster/removed', _id);

        $(_template).fadeOut(200, function(){
            $(_template).remove();
        });
    };
        
    return {
        // init: init,
        getId: getId,
        getName: getName,
        getImage: getImage,
        getHp: getHp,
        getMaxHp: getMaxHp,
        getTop: getTop,
        getLeft: getLeft,

        setPosition: setPosition,

        recDamage: recDamage,
        recHeal: recHealing,
        getMonsterHtml: getMonsterHtml,
        removeMonster: removeMonster
    }
});
