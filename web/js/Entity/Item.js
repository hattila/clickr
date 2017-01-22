/**
 * Item
 *
 * Weapons, tomes, armor etc.
 */
Hw.Enty.Item = Hw.Enty.Item || (function(name, image, type, rarity, template, properties){

    /**
     * Properties
     */
    var _id = 0;
    var _name;
    var _image;
    var _type;
    var _rarity;
    var _template;
    var _properties;

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
    _properties = properties;

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

    var getItemHtml = function () {
        _template = _template
            .replace('{id}', _id)
            .replace(/{class_name}/g, _name.toLowerCase())
            .replace(/{rarity_name}/g, _getRarityName(_rarity))
            .replace('{item}', this);

        _template = $.parseHTML(_template);

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
        getItemHtml: getItemHtml
    }
});
