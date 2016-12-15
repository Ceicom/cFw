(function () {

    var plugin = '/js/plugin/validaform/validaform.js';
    cfw.getJS(plugin);

    cfw.validaform.start = function (options) {

        var config = {
            form: '[data-validate="form"]',
            tooltip: true,
            styles: true
        };

        var options = $.extend(config, options);

        var si = setInterval(function () {
            if (cfw.loadedJS[plugin] == 'loaded') {
                clearInterval(si);

                var valida = new cfwValidaForm();
                    valida.options = options;
                    valida.init();

                    console.info(valida.options);

                if(valida.options.styles)
                    cfw.getJS('/js/plugin/loadcss/loadcss.js', function () {
                        loadCSS('/js/plugin/validaform/validaform.css');
                    });

            }
        }, 100);
    }

    // eventos validaform
    //$(document).on('cfw_validaform_error', function (e, form, type, $el, ret) {});

})();