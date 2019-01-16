(function () {

    var plugin = cfw.pathFile.plugin + 'tagmanager/tagmanager.min.js';
    cfw.getJS(plugin);

    cfw.tagmanager.start = function (idGTM) {

        if (!idGTM)
            console.warn('obrigatório informar GTM para inicializar o tagmanager');
        else {

            var si = setInterval(function () {
                if (cfw.loadedJS[plugin] == 'loaded') {
                    clearInterval(si);

                    var tm = new TagManager(idGTM);
                    tm.headScript();
                    tm.bodyScript();
                }
            }, 100);

        }
    }

})();