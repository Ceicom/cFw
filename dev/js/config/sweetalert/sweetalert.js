(function () {

    var plugin = cfw.pathFile.plugin + 'sweetalert/sweetalert.min.js';
    cfw.getJS(plugin);

    cfw.loadcss.init(cfw.pathFile.plugin + 'sweetalert/sweetalert.min.css');

    cfw.sweetalert.start = function (options) {

        var si = setInterval(function () {
            if (cfw.loadedJS[plugin] == 'loaded') {
                clearInterval(si);
                if (options) swal(options);
            }
        }, 100);
    }

})();