(function () {

    var plugin = '/js/plugin/validaform/validaform.js';
    cfw.getJS(plugin);

    cfw.validaform.start = function (options) {

        var config = {
            form: '[data-validate="form"]',
            tooltip: true,
            style: false
        };

        var options = $.extend(config, options);

        var si = setInterval(function () {
            if (cfw.loadedJS[plugin] == 'loaded') {
                clearInterval(si);

                var x = new cfwValidaForm();
                    x.options = options;
                    x.init();

            }
        }, 100);
    }

    // eventos cidade/estado
    //$(document).on('cfw_cidades_loaded', function (e, $el) {});
    //$(document).on('cfw_estados_loaded', function (e, $el) {});

})();