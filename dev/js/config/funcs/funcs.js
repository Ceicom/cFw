(function () {

    cfw.funcs.start = function (cb) {
        cfw.getJS(cfw.pathFile.plugin + 'funcs/funcs.min.js', function () {

            // evento funcs carregadas
            $(document).trigger('cfw_funcs_loaded');

            if (typeof (cb) == 'function') cb();

        });
    }

})();