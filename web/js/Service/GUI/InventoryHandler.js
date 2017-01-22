/**
 * InventoryHandler Service
 *
 * Manage a/the Players inventory
 *  - handle equipping and unequipping Items (drag and drop)
 *  - inventory style grid/list ?
 *  - different types of equipment slots?
 *  - Get Items
 *  - Remove Items
 *  - load items to Inventory
 */

Hw.Srvc.InventoryHandler = (function(){

    var _$invItem = $('.inv-item');

    _$invItem.draggable({
        revert: 'invalid'
    });

    $('.inv-slot').droppable({
        accept: function (draggable) {
            return (draggable.hasClass('inv-item') && '' === $.trim($(this).html()));
        },
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

    var setupInventory = function (items) {
        console.log('Setting up the inventory with Items: ', items);
    };

    return {
        setupInventory: setupInventory
    }
})();
