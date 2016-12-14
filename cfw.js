(function (w) {
    "use strict";

    console = window.console || { log: function () { } }                                     // console.log fix ie podre véio
    if (typeof jQuery === "undefined") { throw new Error('cfw é dependente do JQuery...'); } // verifica inicialização do jquery

    var plugins     = ['cmodal', 'matchheight', 'citystate', 'zipcode', 'validaform','validaform'];
    var cfwCore     = function () { };      // core
    var cfw         = new cfwCore();        // exported

    // js carregados
    cfw.loadedJS = {};

    // get js
    cfwCore.prototype.getJS = function (url, param) {
        cfw.loadedJS[url] = 'loading';

        var callback = typeof (param) === 'function' ? param : null;

        $.getScript(url, function () {
            cfw.loadedJS[url] = 'loaded';
            if (callback) callback();
        });
    }

    // plugins
    plugins.forEach(function (module) {

        cfwCore.prototype[module] = {
            init: function (options) {
                var url = '/js/component/' + module + '/' + module + '.js';

                if (cfw.loadedJS.hasOwnProperty(url))
                    var si = setInterval(function () {
                        if (cfw.loadedJS[url] == 'loaded') {
                            cfw[module].start(options);
                            clearInterval(si);
                        }
                    },100);

                if (!cfw.loadedJS.hasOwnProperty(url))
                    cfw.getJS(url, function () {
                        cfw[module].start(options);
                    });
            }
        }

    });

    // commonjs
    if (typeof exports !== "undefined")
        exports.cfw = cfw;
    else
        w.cfw = cfw;

}(typeof global !== "undefined" ? global : this));