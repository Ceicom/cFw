(function (w) {
    "use strict";

    var zipcode = {
        el: $('input[data-zipcode="zip"]'),
        doing: false,
        lastZip: null,

        setInputAttr: function () {
            if (!this.el.is('[maxlength]')) this.el.attr('maxlength', 8);
            return this;
        },

        clearVal: function (val) {
            return val.replace(/[^\d]/g, '');
        },

        dealEl: function (el) {

            if (!isNaN(el)) {
                $('[data-zipcode-group="' + el + '"]').attr('disabled', false);
                this.doing = false;
            }

            if (isNaN(el)) {
                var status = !el.attr('disabled');

                el.attr('disabled', status);
                this.doing = status;
            }

            return this;
        },

        getInfo: function (cep, $el) {
            var that = this,
                group = $el.attr('data-zipcode-group');

            if (that.lastZip == cep) return false;

                that.dealEl($el);

            var r = $.ajax({
                url: '//src.inf.br/correios/cep.php?cep=' + cep,
                timeout: 5000,
                beforeSend: function () {
                    $('[data-zipcode-group="' + group + '"]').attr('disabled', true);
                },
            });

            r.then(function (data) {

                if (data.erro) {
                    $el.trigger('zipCodeError');
                    that.dealEl(group);
                    console.error(data.erro);
                }
                else {
                    that.lastZip = cep;

                    that
                      .dealEl($el)
                      .putInfo(data, group);
                }
            },
            function (jqXHR) {
                $el.trigger('zipCodeError');
                that.dealEl(group);
                console.error(jqXHR.statusText);
            });

            return this;
        },

        callCityState: function ($el, val) {
            var type = $el.attr('data-list');

            if (type == 'states')
                val = $el.children('option[data-uf="' + val.toLowerCase() + '"]').attr('value');

            $el
                .attr('data-list-start', val)
                .val(val)
                .trigger('change');

            return this;
        },

        putInfo: function (data, group) {
            this.dealEl(group);

            var el_street       = $('[data-zipcode="street"][data-zipcode-group="' + group + '"]');
            var el_district     = $('[data-zipcode="district"][data-zipcode-group="' + group + '"]');
            var el_city         = $('[data-zipcode="city"][data-zipcode-group="' + group + '"]');
            var el_state        = $('[data-zipcode="state"][data-zipcode-group="' + group + '"]');

            // street
            var street = data.rua || '';
            el_street.val(street).trigger('input');

            // district
            var district = data.bairro || '';
            el_district.val(district).trigger('input');

            // state
            var state = data.estado || 0;
            if (el_state.is('[data-list]'))    this.callCityState(el_state, state);
            if (!el_state.is('[data-list]'))   el_state.val(state);

            // city
            var city = data.cidade || 0;
            if (el_city.is('[data-list]'))    this.callCityState(el_city, city);
            if (!el_city.is('[data-list]'))   el_city.val(city);

            return this;
        }

    }.setInputAttr();

    zipcode.el.on('blur paste', function (e) {

        if (!zipcode.doing) {
            var value = zipcode.clearVal($(this).val()).slice(0, 8);

            if (value.length == 8)
                zipcode.getInfo(value, $(this));
        }
    });

    if (zipcode.el.attr('data-zipcode-init'))
        zipcode.el.trigger('blur');

    // commonjs
    if (typeof exports !== "undefined")
        exports.zipcode = zipcode;
    else
        w.zipcode = zipcode;

}(typeof global !== "undefined" ? global : this));