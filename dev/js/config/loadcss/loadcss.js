(function () {

    cfw.loadcss.start = function (file) {

        cfw.getJS(cfw.pathFile.plugin + 'loadcss/loadcss.min.js', function () {
            if (file) loadCSS(file);
        });

    }

})();