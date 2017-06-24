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
    var _domObject;
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

        // // @TODO: if it never needs to be re-renderd then return the rendered template, otherwise
        // // return what is parsed, but don't overwrite the string property!
        // if (typeof _template !== 'string') {
        //     return _template;
        // }

        _template = _template
            .replace('{id}', _id)
            .replace(/{class_name}/g, _name.toLowerCase())
            .replace(/{rarity_name}/g, _getRarityName(_rarity))
            // .replace(
            //     '{item}',
            //     // JSON.stringify(
            //         {
            //             id: _id,
            //             type: _type,
            //             rarity: _rarity,
            //             effects: _effects
            //         }
            //     // )
            // )
        ;

        return _template;
    };

    var getDomObject = function () {
        console.log(typeof _domObject);

        if (typeof _domObject === 'undefined') {
            _domObject = $.parseHTML(getItemHtml());

            $(_domObject).data(
                'item',
                {
                    id: _id,
                    type: _type,
                    rarity: _rarity,
                    effects: _effects
                });
            $(_domObject).attr('style', 'background-image: url(\'' + getImage() + '\');');
        }

        console.log(_domObject);

        return _domObject;
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
        getItemHtml: getItemHtml,
        getDomObject: getDomObject
    }
});
