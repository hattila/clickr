/**
 * Item
 *
 * Weapons, tomes, armor etc.
 */
Hw.Entity.Item = (function(name, image, type, rarity, template, effects){

    /**
     * Properties
     */
    var _id = Hw.Service.IdProvider.item.getNewId();
    var _name;
    var _image;
    var _type;
    var _rarity;
    var _template;
    var _effects;

    var _rarityNames = [
        'junk',
        'normal',
        'magical',
        'rare',
        'legendary'
    ];

    // TODO: validation
    _name = name;
    _image = image;
    _type = type;
    _rarity = rarity;
    _template = template;
    _effects = effects;

    var getId = function () {
        return _id;
    };
    var getName = function () {
        return _name;
    };
    var getImage = function () {
        return _image;
    };
    var getType = function () {
        return _type;
    };
    var getRarity = function () {
        return _rarity;
    };
    var getEffects = function () {
        return _effects;
    };

    var getItemHtml = function () {
        _template = _template
            .replace('{id}', _id)
            .replace(/{class_name}/g, _name.toLowerCase())
            .replace(/{rarity_name}/g, _getRarityName(_rarity))
            .replace('{item}', JSON.stringify({
                id: _id,
                type: _type,
                rarity: _rarity,
                effects: _effects
            }));

        _template = $.parseHTML(_template);

        $(_template).attr('style', 'background-image: url(\'' + getImage() + '\');');

        return _template;
    };


    var _getRarityName = function (rarity) {
        return _rarityNames[rarity];
    };

    return {
        getId: getId,
        getName: getName,
        getImage: getImage,
        getType: getType,
        getRarity: getRarity,
        getEffects: getEffects,
        getItemHtml: getItemHtml
    }
});
