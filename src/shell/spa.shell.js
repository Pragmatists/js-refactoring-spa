spa.shell = (function () {
    var config = {
        main_html: String()
        + '<div class="spa-shell-head"></div>'
        + '<div class="spa-shell-body"></div>'
        + '<div class="spa-shell-footer"></div>'
        + '<div class="spa-shell-chat"></div>'
    };
    var state = {$container: null};
    var jqueryMap = {};
    var setJqueryMap, initModule;


    setJqueryMap = function () {
        var $container = state.$container;
        jqueryMap = {$container: $container};
    };

    initModule = function ($container) {
        state.$container = $container;
        $container.html(config.main_html);
        setJqueryMap();
    };

    return {initModule: initModule};
})();
