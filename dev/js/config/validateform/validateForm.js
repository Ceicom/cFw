(function () {

    var plugin = cfw.pathFile.plugin + 'validateform/validateform.min.js';
    cfw.getJS(plugin);

    cfw.validateform.start = function (options) {

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
                    cfw.getJS(cfw.pathFile.plugin + 'loadcss/loadcss.min.js', function () {
                        loadCSS(cfw.pathFile.plugin + 'validateform/validateform.min.css');
                    });
            }
        }, 100);
    }

    // eventos validaform
    //$(document).on('cfw_validateForm_error', function (e, form, type, $el, ret) {});

})();