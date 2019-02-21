/*
 * foi necessário modificar 2 linha do core do plugin afim de manter compatbilidade com sites
 * que utilizavam o seletor de div para os itens de navegação, segue código atualizado e linhas correspondentes
 * this._templates = [ $('<div role="button">')                         // 3018
 * this._controls.$absolute.on('click', 'div', $.proxy(function(e) {    // 3027
 */

(function () {

    var plugin = cfw.pathFile.plugin + 'owlcarousel/owlcarousel.min.js';
    cfw.getJS(plugin);

    cfw.owlcarousel.start = function (options) {

        var config = {
            element: null
        };

        var options = $.extend(config, options);

        // fix version update default navElement changed to button
        if(!options.navElement) options.navElement = 'div';

        if (options.element) {
            cfw.loadcss.init({
                file: cfw.pathFile.plugin + 'owlcarousel/owlcarousel.min.css',
                callback: function () {
                    var si = setInterval(function () {
                        if (cfw.loadedJS[plugin] == 'loaded') {
                            clearInterval(si);
                            $(options.element)
                                .addClass('owl-carousel')   // fix version update default not add owl-carousel class
                                .owlCarousel(options);
                        }
                    }, 100);
                }
            });
        }
    };
})();