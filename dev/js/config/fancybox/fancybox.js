(function () {

    var plugin = cfw.pathFile.plugin + 'fancybox/jquery.fancybox.min.js';
    cfw.getJS(plugin);

    cfw.loadcss.init(cfw.pathFile.plugin + 'fancybox/jquery.fancybox.min.css');

    cfw.fancybox.start = function (options) {

        var config = {
            element: null
        };

        var options = $.extend(config, options);

        if (options.element) {

            // devido a elementos dinamicos (que virão no futuro) :P
            options.selector = options.element;

            var si = setInterval(function () {
                if (cfw.loadedJS[plugin] == 'loaded') {
                    clearInterval(si);
                    $().fancybox(options);
                }
            }, 100);
        }
    }

})();