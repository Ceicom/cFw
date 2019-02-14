(function () {

    var plugin = cfw.pathFile.plugin + 'dotdotdot/dotdotdot.min.js';
    cfw.getJS(plugin);

    cfw.dotdotdot.start = function (options) {

        var config = {
            element: null,
            watch: true
        };

        var options = $.extend(config, options);

        if (options.element) {
            var si = setInterval(function () {
                if (cfw.loadedJS[plugin] == 'loaded') {
                    clearInterval(si);

                    var elements = document.querySelectorAll(options.element);

                    for (i = 0; i < elements.length; ++i) {
                        new Dotdotdot(elements[i] , options );
                    }
                }
            }, 100);
        }
    }

})();