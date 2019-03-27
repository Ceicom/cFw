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
        $('[data-mask]').each(function () {
            cfw.mask.translateMasks($(this));
        });

        this.initiated = true;
    }

    cfw.mask.translateMasks = function($el) {

        switch ($el.attr('data-mask')) {
            case 'zip':
                cfw.mask.setMaskAtribute($el, '00000-000');
                break;
            case 'phone':
                cfw.mask.maskPhoneDeal($el);
                break;
            case 'date':
                cfw.mask.setMaskAtribute($el, '00/00/0000');
                break;
            case 'cnpj':
                cfw.mask.setMaskAtribute($el, { 'data-mask': '00.000.000/0000-00', 'data-mask-reverse': true });
                break;
            case 'cpf':
                cfw.mask.setMaskAtribute($el, { 'data-mask': '000.000.000-00', 'data-mask-reverse': true });
                break;
            case 'money':
                cfw.mask.setMaskAtribute($el, { 'data-mask': '#.##0,00', 'data-mask-reverse': true });
                break;
            case 'time':
                val = '00:00:00';
                break;
        }
    }

    cfw.mask.setMaskAtribute = function($el, atributes) {

        var attrsMask = {};

        if (typeof (atributes) == 'string')
            attrsMask['data-mask'] = atributes;
        else
            attrsMask = atributes;

        $.each(attrsMask, function (k, v) {
            $el.attr(k, v);
        });
    }

    cfw.mask.maskPhoneDeal = function($el) {
        $el.addClass('js-maskit-phone-mask').removeAttr('data-mask');

        var w8 = setInterval(function () {
            if (cfw.loadedJS[plugin] == 'loaded') {
                clearInterval(w8);

                var celphoneMask = ['(00) 00000-0000', '(00) 0000-00000'];

                $('.js-maskit-phone-mask').mask(celphoneMask[1], {
                    onKeyPress:
                       function (val, e, field, options) {
                           field.mask(val.length > 14 ? celphoneMask[0] : celphoneMask[1], options);
                       }
                });
            }
        }, 100);
    }

})();