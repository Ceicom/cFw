(function () {

    var plugin = '/js/plugin/validateForm/validateForm.js';
    cfw.getJS(plugin);

    cfw.validateForm.start = function (options) {

        var config = {
            form: '[data-validate="form"]',
            tooltip: true,
            styles: true
        };

        var options = $.extend(config, options);

        var si = setInterval(function () {
            if (cfw.loadedJS[plugin] == 'loaded') {
                clearInterval(si);

                var form = new cfwValidaForm();
                    form.options = options;
                    form.init();

                if (form.options.styles)
                    cfw.getJS('/js/plugin/loadcss/loadcss.js', function () {
                        loadCSS('/js/plugin/validateForm/validateForm.css');
                    });
            }
        }, 100);
    }

    // eventos validaform
    //$(document).on('cfw_validateForm_error', function (e, form, type, $el, ret) {});

})();