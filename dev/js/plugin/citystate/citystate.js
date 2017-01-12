(function (w) {
    "use strict";

    var citystate = {};

    citystate.init = function () {
        this
            .setData()
            .start();
    }

    citystate.setData = function () {

        if ($(this.options.selectState).length && $(this.options.selectCity).length) {

            $(this.options.selectState)
                .attr({
                    'data-list': 'states',
                    'data-list-group': this.options.group,
                    'data-list-initials': this.options.initials,
                    'data-list-start': this.options.initState,
                    'data-list-filter': this.options.filterStates,
                });

            $(this.options.selectCity)
                .attr({
                    'data-list': 'cities',
                    'data-list-group': this.options.group,
                    'data-list-start': this.options.initCity
                });
        }

        return this;
    }

    citystate.start = function () {
        var that = this;

        if (!localStorage.getItem('cfw_citst_states'))
            that.getJson('states', null, function () {
                that.dealSelects();
            });

        if (localStorage.getItem('cfw_citst_states'))
            that.dealSelects();

    }

    citystate.getJson = function (what, $el, cb) {
        var that = this;

        if (!localStorage.getItem('cfw_citst_' + what)) {
            var file = what == 'states' ? 'states.min.json' : 'cities/' + what.toLowerCase() + '.min.json';

            $.getJSON(cfw.pathFile.json + file, function (data) {
                localStorage.setItem('cfw_citst_' + what, JSON.stringify(data));
                if ($el) that.dealData(what, $el, data);
                if (typeof (cb) == 'function') cb();
            });
        }

        if ($el && localStorage.getItem('cfw_citst_' + what))
            that.dealData(what, $el, JSON.parse(localStorage.getItem('cfw_citst_' + what)));
    }

    citystate.dealData = function (what, $el, data) {
        var html = what == 'states' ? '<option value="">Selecione um estado</option>' : '';
            html += this.generateOptions(what, $el, data);

        this.putOptions(what, $el, html);
    }

    citystate.dealSelects = function () {
        var that = this;

        $('select[data-list]:not([data-list-loaded="true"])').each(function () {
            var type = $(this).attr('data-list');

            if (type == 'states')
                that.getJson(type, $(this));

            else if (type == 'cities') {
                var $el = $(this);
                var ufRef = $('[data-list="states"][data-list-group="' + $el.attr('data-list-group') + '"]');

                if (!ufRef.attr('data-list-start'))
                    that.disableCities($el);

                if (!!ufRef.attr('data-list-start')) {
                    var si = setInterval(function () {
                        if (!!ufRef.attr('data-list-loaded')) {
                            clearInterval(si);
                            that.getJson(ufRef.children('option:selected').attr('data-uf'), $el);
                        }
                    });
                }

            }

        });

        $('[data-list="states"]').on('change', function (e) {
            e.stopImmediatePropagation();

            var $el = $('[data-list="cities"][data-list-group="' + $(this).attr('data-list-group') + '"]');

            if ($el.length) {
                if ($(this).val() != 0)
                    that.getJson($(this).children('option:selected').attr('data-uf'), $el);

                if ($(this).val() == 0)
                    that.disableCities($el);
            }
        });

    }

    citystate.putOptions = function (what, $el, data) {
        $el
            .attr({
                'disabled': false,
                'data-list-loaded': true
            })
            .html(data);

        var event = what == 'states' ? what : 'cities';
        $(document).trigger('cfw_' + event + '_loaded', [$el]);
    }

    citystate.dealFilterUF = function ($el, data) {
        var returnData = {};
        var states = $el.attr('data-list-filter') ? $el.attr('data-list-filter').split(',') : [];

        if (states.length) {

            $.each(states, function (k, v) {
                var v = v.toUpperCase();
                var removeIt = v.substr(0, 1) === '!';

                if (!removeIt) {
                    returnData[v] = {};
                    returnData[v] = data[v];
                }

                if (removeIt) {
                    v = v.slice(1);

                    if (!Object.keys(returnData).length) returnData = data;
                    delete returnData[v];
                }
            });

        }

        if (!states.length)
            returnData = data;

        return returnData;
    }

    citystate.generateOptions = function (what, $el, data) {

        var r = '',
            that = this,
            data = what == 'states' ? that.dealFilterUF($el, data) : data,
            init = $el.attr('data-list-start') ? $el.attr('data-list-start').toLowerCase() : null;

        $.each(data, function (k, v) {

            var item = v,
                dataEl = '';

            if (what == 'states') {
                if ($el.attr('data-list-initials') == 'true') item = k;
                dataEl += ' data-uf="' + k + '"';
            }

            if (init == v.toLowerCase() || init == k.toString().toLowerCase())
                dataEl += ' selected';

            r += '<option ' + dataEl.toLowerCase() + ' value="' + item + '">' + item + '</option>';
        });

        return r;
    }

    citystate.disableCities = function ($el) {
        $el
          .attr({
              'disabled': true,
              'data-list-loaded': true
          })
          .html('<option value="" selected>Selecione uma cidade</option>');

        $(document).trigger('cfw_cidades_loaded', [$el]);
    }

    // commonjs
    if (typeof exports !== "undefined")
        exports.citystate = citystate;
    else
        w.citystate = citystate;

}(typeof global !== "undefined" ? global : this));