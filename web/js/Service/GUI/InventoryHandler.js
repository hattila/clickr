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

Hw.Service.InventoryHandler = (function(){

    var _invItemClass = '.inv-item';

    $('.inv-slot').droppable({
        accept: function (draggable) {
            if ($(this).hasClass('equip-slot')) {
                if (-1 !== ['left', 'right'].indexOf($(this).data('slot')) && 'weapon' == $(draggable).data('item').type) {
                    return true;
                }

                if ($(this).data('slot') == $(draggable).data('item').type) {
                    return true;
                }

                return false;
            } else {
                return (draggable.hasClass('inv-item') && '' === $.trim($(this).html()));
            }
        },
        drop: function (event, ui) {
            ui.draggable
                .css({
                    top: 0,
                    left: 0
                })
                .appendTo($(this));

            /**
             * TODO find the best way to manage items in the memory map and in the DOM as well.
             * When an Item is physically replaced by a drag-drop event, the placement in the DOM updates,
             * but the placement in the equipment and inventory maps are not.
             */

            if ($(this).hasClass('equip-slot')) {
                // _equippedItemsMap[$(this).data('slot')] =
            } else {

            }

            Player.applyItemBonuses(_equippedItemsMap);

        }
    });

    var $_equippedInventory = $('#equipped-inventory');
    var _equippedItemsMap = {
        hat: null,
        armor: null,
        trinket: null,
        left: null,
        right: null
    };

    var $_inventory = $('#inventory');
    var _inventoryMap = [
        null, null, null, null, null,
        null, null, null, null, null,
        null, null, null, null, null
    ];

    /**
     * Setup the Players inventory based on a saved snapshot
     *
     * @param {{Array}} items
     *   items[0] => {equipped items}
     *   items[1] => [rest of the inventory]
     */
    var setupInventory = function (items) {
        console.log('Setting up the inventory with Items: ', items);

        $.each(items[0], function (slot, item) {
            if (_equippedItemsMap.hasOwnProperty(slot)) {
                _equippedItemsMap[slot] = item;
            }
        });

        for (var i = 0; i < _inventoryMap.length; i++) {
            _inventoryMap[i] = items[1][i];
        }

        _updateInventoryHtml();
    };

    var _updateInventoryHtml = function () {
        $.each(_equippedItemsMap, function(slot, item){
            if (item != null) {
                $_equippedInventory.find("[data-slot='" + slot + "']").html(item.getItemHtml());
            }
        });

        for (var i = 0; i < _inventoryMap.length; i++) {
            if (null != _inventoryMap[i]) {
                $_inventory.find("[data-slot='" + i + "']").html(
                    _inventoryMap[i].getItemHtml()
                );
            }
        }

        $(_invItemClass).draggable({
            revert: function (isValid) {
                if (isValid) {
                    return false;
                } else {
                    Materialize.toast('I can\'t put that there.', 1500);
                    return true;
                }
            },
            revertDuration: 100
        });
    };

    var getInventory = function () {
        console.log(_equippedItemsMap);
        console.log(_inventoryMap);
    };

    return {
        setupInventory: setupInventory,
        getInventory: getInventory
    }
})();
