(function () {

    cfw.lightgallery.start = function (options) {

        var config = {
            element: null
        };

        var options = $.extend(config, options);

        if (options.element) {

            cfw.loadcss.init(cfw.pathFile.plugin + 'lightgallery/css/lightgallery.min.css');
            cfw.loadcss.init(cfw.pathFile.plugin + 'lightgallery/css/lg-transitions.min.css');

            cfw.getJS(cfw.pathFile.plugin + 'mousewheel/mousewheel.min.js', function () {

                var plugin = cfw.pathFile.plugin + 'lightgallery/js/lightgallery.min.js';
                cfw.getJS(plugin);

                var si = setInterval(function () {
                    if (cfw.loadedJS[plugin] == 'loaded') {
                        clearInterval(si);

                        if (options.thumbnail == true)
                            cfw.getJS(cfw.pathFile.plugin + 'lightgallery/plugin/lg-thumbnail.min.js');

                        if (options.autoplay == true)
                            cfw.getJS(cfw.pathFile.plugin + 'lightgallery/plugin/lg-autoplay.min.js');

                        if (options.video == true)
                            cfw.getJS(cfw.pathFile.plugin + 'lightgallery/plugin/lg-video.min.js');

                        if (options.fullScreen == true)
                            cfw.getJS(cfw.pathFile.plugin + 'lightgallery/plugin/lg-fullscreen.min.js');

                        if (options.pager == true)
                            cfw.getJS(cfw.pathFile.plugin + 'lightgallery/plugin/lg-pager.min.js');

                        if (options.zoom == true)
                            cfw.getJS(cfw.pathFile.plugin + 'lightgallery/plugin/lg-zoom.min.js');

                        if (options.hash == true)
                            cfw.getJS(cfw.pathFile.plugin + 'lightgallery/plugin/lg-hash.min.js');

                        if (options.share == true)
                            cfw.getJS(cfw.pathFile.plugin + 'lightgallery/plugin/lg-share.min.js');

                        $(options.element).lightGallery(options);

                    }
                }, 100);
            });
        }
    }

})();