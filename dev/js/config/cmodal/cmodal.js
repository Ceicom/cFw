(function () {

    cfw.cmodal.start = function () {

        cfw.getJS(cfw.pathFile.plugin + 'cmodal/cmodal.min.js');

        cfw.getJS(cfw.pathFile.plugin + 'loadcss/loadcss.min.js', function () {
            loadCSS(cfw.pathFile.plugin + 'cmodal/cmodal.min.css');
        });
    }

})();