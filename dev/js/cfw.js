var z = 0;

(function (w) {
    "use strict";

    console = window.console || { log: function () { } }                                     // console.log fix ie podre véio
    if (typeof jQuery === "undefined") { throw new Error('cfw é dependente do JQuery...'); } // verifica inicialização do jquery

    var plugins     = [
                        'cmodal',           // modal                    [ceicom]
                        'matchheight',      // match height             [http://brm.io/jquery-match-height/]
                        'citystate',        // lista cidade estado      [ceicom]
                        'zipcode',          // completa end pelo cep    [ceicom]
                        'validateform',     // validação formulário     [ceicom]
                        'mask',             // mascára inputs           [http://igorescobar.github.io/jQuery-Mask-Plugin/]
                        'form',             // atalho modulos forms     [ceicom]
                        'funcs'             // funções úteis            [ceicom]
                      ];

    var cfwCore     = function () { };      // core
    var cfw         = new cfwCore();        // exported

    // js carregados
    cfw.loadedJS = {};

    // get js
    cfwCore.prototype.getJS = function (url, param) {

        var callback = typeof (param) === 'function' ? param : null;

        if (cfw.loadedJS.hasOwnProperty(url))
            var si = setInterval(function () {
                if (cfw.loadedJS[url] == 'loaded') {
                    clearInterval(si);
                    if (callback) callback();
                }
            }, 100);


        if (!cfw.loadedJS.hasOwnProperty(url)) {
            cfw.loadedJS[url] = 'loading';

            $.getScript(url, function () {
                cfw.loadedJS[url] = 'loaded';
                if (callback) callback();
            });
        }


    }

    // plugins
    plugins.forEach(function (module) {

        cfwCore.prototype[module] = {
            init: function (options) {
                var url = '/prod/js/config/' + module + '/' + module + '.min.js';

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