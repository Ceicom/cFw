(function () {

    var plugin = '/prod/js/plugin/matchheight/matchheight.min.js';
    cfw.getJS(plugin);

    cfw.matchheight.start = function (options) {

        var config = {
            element: null
        };

        var options = $.extend(config, options);

        if (options.element) {
            var si = setInterval(function () {
                if (cfw.loadedJS[plugin] == 'loaded') {
                    clearInterval(si);
                    $(options.element).matchHeight(options);
                }
            }, 100);
        }
    }

})();