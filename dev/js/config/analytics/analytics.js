(function () {

    var plugin = cfw.pathFile.plugin + 'analytics/analytics.min.js';
    cfw.getJS(plugin);

    cfw.analytics.start = function (idAccount) {

        if (!idAccount)
            console.warn('obrigatório informar UA para inicializar o analytics');
        else {

            var si = setInterval(function () {
                if (cfw.loadedJS[plugin] == 'loaded') {
                    clearInterval(si);

                    ga('create', idAccount, 'auto');
                    ga('send', 'pageview');

                }
            }, 100);

        }
    }

})();