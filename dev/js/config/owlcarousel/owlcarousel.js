(function () {

    var plugin = cfw.pathFile.plugin + 'owlcarousel/owlcarousel.min.js';
    cfw.getJS(plugin);

    cfw.owlcarousel.start = function (options) {

        var config = {
            element: null
        };

        var options = $.extend(config, options);

        if (options.element) {

            cfw.loadcss.init({
                file: cfw.pathFile.plugin + 'owlcarousel/owlcarousel.min.css',
                callback: function () {
                    var si = setInterval(function () {
                        if (cfw.loadedJS[plugin] == 'loaded') {
                            clearInterval(si);
                            $(options.element).owlCarousel(options);
                        }
                    }, 100);
                }
            });
        }
    };
})();