/**
 * Item
 *
 * Weapons, tomes, armor etc.
 */
Hw.Enty.Item = Hw.Enty.Item || (function(template, name, image){

    /**
     * Properties
     */
    var _id = 0;
    var _name;
    var _image;

    // TODO: validation
    _name = name;
    _image = image;

    var getId = function () {
        return _id;
    };
    var getName = function () {
        return _name;
    };
    var getImage = function () {
        return _image;
    };


    return {
        getId: getId,
        getName: getName,
        getImage: getImage

    }
});
