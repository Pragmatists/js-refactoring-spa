spa.shell = (function () {
    var config = {
        main_html: String()
        + '<div class="spa-shell-head"></div>'
        + '<div class="spa-shell-body"></div>'
        + '<div class="spa-shell-footer"></div>'
        + '<div class="spa-shell-chat"></div>',
        chat_open_time: 1000,
        chat_close_time: 500,
        chat_open_height: 500,
        chat_close_height: 15
    };
    var state = {
        $container: null,
        is_chat_close: true
    };
    var jqueryMap = {};
    var setJqueryMap, initModule, toggleChat, clickOnChat;


    toggleChat = function (extend, callback) {

        var chat_height = jqueryMap.$chat.height();
        var is_open = chat_height === config.chat_open_height;
        var is_closed = chat_height === config.chat_close_height;
        var is_sliding = ! is_open && ! is_closed;
        if (is_sliding) {
            return false;
        }

        if (extend) {
            jqueryMap.$chat.animate(
                {height: config.chat_open_height},
                config.chat_open_time,
                function () {
                    state.is_chat_close = false;
                    if (callback) {
                        callback(jqueryMap.$chat);
                    }
                }
            );
            return true;
        }

        jqueryMap.$chat.animate(
            {height: config.chat_close_height},
            config.chat_close_time,
            function () {
                state.is_chat_close = true;
                if (callback) {
                    callback(jqueryMap.$chat);
                }
            }
        );
        return true;

    };

    clickOnChat = function ( event ) {
        toggleChat( state.is_chat_close );
        return false;
    };


    setJqueryMap = function () {
        var $container = state.$container;

        jqueryMap = {
            $container: $container,
            $chat: $container.find('.spa-shell-chat')
        };
    };

    initModule = function ($container) {
        state.$container = $container;
        $container.html(config.main_html);
        setJqueryMap();
        jqueryMap.$chat.click( clickOnChat );
    };

    return {initModule: initModule};
})();
