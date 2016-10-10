/**
 * Created by hattila on 2016.04.21..
 */

Hw.Srvc.Game = Hw.Srvc.Game || (function(){

    /**
     * Properties
     */
    var _monsters = 10;

    var init = function ()
    {

        /**
         * Subscribe demo
         */
        $.subscribe('/something/happens', function(e, ele){
            
        });
    };


    return {
        init: init
    }
})();