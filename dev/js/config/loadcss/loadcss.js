(function () {

    cfw.loadcss.start = function (options) {

        cfw.getJS(cfw.pathFile.plugin + 'loadcss/loadcss.min.js', function () {
            if (options) {
                var arquivo = typeof (options) === 'object' ? options.file : options;
                var callback = typeof (options) === 'object' ? options.callback : null;

                var stylesheet = loadCSS(arquivo);
                if (callback) onloadCSS(stylesheet, callback);
            }
        });

    }

})();