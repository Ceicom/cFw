(function () {

    cfw.cmodal.start = function () {
        cfw.getJS('/js/plugin/cmodal/cmodal.js');

        cfw.getJS('/js/plugin/loadcss/loadcss.js', function () {
            loadCSS('/js/plugin/cmodal/cmodal.css');
        });
    }

})();