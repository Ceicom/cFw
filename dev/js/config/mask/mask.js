(function () {

    var plugin = cfw.pathFile.plugin + 'mask/mask.min.js';
    cfw.getJS(plugin);

    cfw.mask.initiated = false;

    cfw.mask.start = function (options) {

        var config = {
            element: null,
            mask: null
        };

        var options = $.extend(config, options);

        if (!this.initiated) this.dealMasks();

        if (options.element) {
            var si = setInterval(function () {
                if (cfw.loadedJS[plugin] == 'loaded') {
                    clearInterval(si);

                    if (options.mask)
                        $(options.element).mask(options.mask, options.options);

                }
            }, 100);
        }
    }

    cfw.mask.dealMasks = function () {
        function translateMasks($el) {

            switch ($el.attr('data-mask')) {
                case 'zip':
                    setMaskAtribute($el, '00000-000');
                    break;
                case 'phone':
                    setMaskAtribute($el, '(00) 00000-0000');
                    break;
                case 'date':
                    setMaskAtribute($el, '00/00/0000');
                    break;
                case 'cnpj':
                    setMaskAtribute($el, { 'data-mask': '00.000.000/0000-00', 'data-mask-reverse': true });
                    break;
                case 'cpf':
                    setMaskAtribute($el, { 'data-mask': '000.000.000-00', 'data-mask-reverse': true });
                    break;
                case 'money':
                    setMaskAtribute($el, { 'data-mask': '#.##0,00', 'data-mask-reverse': true });
                    break;
                case 'time':
                    val = '00:00:00';
                    break;
            }
        }

        function setMaskAtribute($el, atributes) {

            var attrsMask = {};

            if (typeof (atributes) == 'string')
                attrsMask['data-mask'] = atributes;
            else
                attrsMask = atributes;

            $.each(attrsMask, function (k, v) {
                $el.attr(k, v);
            });
        }

        $('[data-mask]').each(function () {
            translateMasks($(this));
        });

        this.initiated = true;
    }

})();