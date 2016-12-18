/**
 * InventoryHandler Service
 *
 * Manage a/the Players inventory
 *  - handle equipping and unequipping Items (drag and drop)
 *  - inventory style grid/list ?
 *  - different types of equipment slots?
 *  - Get Items
 *  - Remove Items
 */

Hw.Srvc.InventoryHandler = (function(){

    var _$invItem = $('.inv-item');

    _$invItem.draggable({
        revert: 'invalid',
        // helper: 'clone'
    });

    $('.inv-slot').droppable({
        accepts: _$invItem,
        drop: function (event, ui) {
            console.log('an element has been dropped on me!', ui);
            ui.draggable
                .css({
                    top: 0,
                    left: 0
                })
                .appendTo($(this));

        }
    });

    return {

    }
})();
