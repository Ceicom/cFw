(function () {

    var plugin = '/js/plugin/citystate/citystate.js';
    cfw.getJS(plugin);

    cfw.citystate.start = function (options) {

        var config = {
            filterStates: [],
            group: Math.floor((Math.random()*9999)+1),
            selectState: null,
            selectCity: null,
            initials: false,
            initState: null,
            initCity: null
        };

        var options = $.extend(config, options);

        var si = setInterval(function () {
            if (cfw.loadedJS[plugin] == 'loaded') {
                clearInterval(si);

                citystate.options = options;
                citystate.init();

            }
        }, 100);
    }

    // eventos cidade/estado
    //$(document).on('cfw_cidades_loaded', function (e, $el) {});
    //$(document).on('cfw_estados_loaded', function (e, $el) {});

})();