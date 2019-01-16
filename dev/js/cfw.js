(function (w) {
    "use strict";

    if (typeof jQuery === "undefined") { throw new Error('cfw é dependente do JQuery...'); } // verifica inicialização do jquery

    var plugins     = [
                        'analytics',        // analytics google         [https://www.google.com/analytics/]
                        'citystate',        // lista cidade estado      [ceicom]
                        'cmodal',           // modal                    [ceicom]
                        'dotdotdot',        // corta texto insere ...   [https://github.com/FrDH/jQuery.dotdotdot]
                        'fancybox',         // modal, galeria, etc..    [http://fancyapps.com/fancybox/3/]
                        'form',             // atalho modulos forms     [ceicom]
                        'lightgallery',     // galeria fotos            [https://github.com/sachinchoolur/lightGallery]
                        'funcs',            // funções úteis            [ceicom]
                        'loadcss',          // assyncrono loader css    [https://github.com/filamentgroup/loadCSS]
                        'mask',             // mascára inputs           [http://igorescobar.github.io/jQuery-Mask-Plugin/]
                        'owlcarousel',      // slider, carousel         [https://owlcarousel2.github.io/OwlCarousel2/]
                        'printthis',        // imprimir elemento        [https://github.com/jasonday/printThis]
                        'matchheight',      // match height             [http://brm.io/jquery-match-height/]
                        'submitform',       // form via ajax            [ceicom]
                        'sweetalert',       // sweet alert :P           [http://t4t5.github.io/sweetalert/]
                        'validateform',     // validação formulário     [ceicom]
                        'validateformdata', // validação formData       [ceicom]
                        'zipcode',          // completa end pelo cep    [ceicom]
                        'tagmanager'        // tagmanager do google     [https://tagmanager.google.com/]
    ];

    var cfwCore     = function () { };      // core
    var cfw         = new cfwCore();        // exported

    // js carregados
    cfw.loadedJS = {};

    // caminho
    cfw.pathFile = {
        //config: '/prod/cfw/',
        //plugin: '/prod/vendor/',
        //json: '/prod/json/citystate/'

        config: '//src.inf.br/cfw/',
        plugin: '//src.inf.br/vendor/',
        json: '//src.inf.br/json/citystate/'
    }

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
                var url = cfw.pathFile.config + module + '/' + module + '.min.js';

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