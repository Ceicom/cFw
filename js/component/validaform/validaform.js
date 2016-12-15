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

                var valida = new cfwValidaForm();
                    valida.options = options;
                    valida.init();

            }
        }, 100);
    }

    // eventos validaform
    //$(document).on('cfw_validaform_error', function (e, form, type, $el, ret) {});

})();