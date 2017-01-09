(function () {

    var plugin = cfw.pathFile.plugin + 'owlcarousel/owlcarousel.min.js';
    cfw.getJS(plugin);

    cfw.loadcss.init(cfw.pathFile.plugin + 'owlcarousel/owlcarousel.min.css');

    cfw.owlcarousel.start = function (options) {

        var config = {
            element: null
        };

        var options = $.extend(config, options);

        if (options.element) {
            var si = setInterval(function () {
                if (cfw.loadedJS[plugin] == 'loaded') {
                    clearInterval(si);
                    $(options.element).owlCarousel(options);
                }
            }, 100);
        }
    }

})();