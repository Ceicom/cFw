(function () {

    cfw.cmodal.start = function () {

        cfw.getJS('/prod/js/plugin/cmodal/cmodal.min.js');

        cfw.getJS('/prod/js/plugin/loadcss/loadcss.min.js', function () {
            loadCSS('/prod/js/plugin/cmodal/cmodal.min.css');
        });
    }

})();