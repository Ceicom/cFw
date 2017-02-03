(function () {

    cfw.cmodal.start = function () {

        cfw.loadcss.init({
            file: cfw.pathFile.plugin + 'cmodal/cmodal.min.css',
            callback: cfw.getJS(cfw.pathFile.plugin + 'cmodal/cmodal.min.js')
        });

    }

})();