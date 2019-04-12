(function () {

    var plugin = cfw.pathFile.plugin + 'facebook/facebook.min.js';
    cfw.getJS(plugin);

    cfw.facebook.start = function (options) {
        cfw.getJS('//connect.facebook.net/en_US/sdk.js', function () {

            var si = setInterval(function () {
                if (cfw.loadedJS[plugin] == 'loaded') {
                    clearInterval(si);

                    new facebook().init(options);
                }
            }, 100);
        });
    }
})();