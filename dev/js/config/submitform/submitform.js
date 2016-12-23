(function () {

    cfw.submitform.start = function () {

        var plugin = cfw.pathFile.plugin + 'submitform/submitform.min.js';
        cfw.getJS(plugin);

        // sweet alert
        cfw.sweetalert.init();

        var si = setInterval(function () {
            if (cfw.loadedJS[plugin] == 'loaded') {
                clearInterval(si);

                cfwSubmitForm.dealBtn(true);

            }
        }, 100);
    }

})();