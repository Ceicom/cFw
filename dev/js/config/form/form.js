(function () {

    cfw.form.start = function (options) {

        var config = {
            citystate: true,
            zipcode: true,
            validateform: true,
            mask: true,
            validateformdata: true,
            submitform: true,
            invisiblecaptcha: false
        };

        var options = $.extend(config, options);

        $.each(options, function (k, v) {
            if (typeof (v) === 'boolean' && v === false)
                return;

            cfw[k].init(typeof (v) === 'object' ? v : {});
        });
    }

    cfw.form.captchas = {
        itens: {},
        active: null
    };

})();