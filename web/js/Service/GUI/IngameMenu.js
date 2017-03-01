/**
 * IngameMenu Service
 *
 * Show an ingame menu
 *  - pause game?
 *  - mid level stats
 */

Hw.Service.IngameMenu = (function(){

    var _template = $('#ingame-menu');

    // event listener to the ESC key ?

    var open = function (menu, postOpenCallback) {
        menu = menu || {
                title: 'Ingame Menu',
                content: '',
                actions: []
            };

        _template.children('.title').html(menu.title);
        _template.children('.content').html(menu.content);

        if (menu.actions.length > 0) {
            var buttons = [];
            var clickAction = function (e) {
                e.preventDefault();
                $(this).data('clickAction')();
                $(this).off('click');
            };


            for (var i = 0; i < menu.actions.length; i++) {
                var button = '<a class="menu-btn btn-' + i + '" href="#">' + menu.actions[i].title + '</a>';
                buttons.push(button);
            }

            _template.children('.actions').html(buttons.join(''));

            for (i = 0; i < menu.actions.length; i++) {
                var $btn = $(_template).children('.actions').children('.btn-' + i);
                $btn.data('clickAction', menu.actions[i].action);
                $btn.click(clickAction);
            }
        }

        _template.addClass('open');

        if (typeof postOpenCallback === 'function') {
            postOpenCallback()
        }
    };

    var close = function () {
        _template.removeClass('open');
    };

    return {
        open: open,
        close: close
    }
})();
