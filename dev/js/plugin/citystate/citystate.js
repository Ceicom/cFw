(function (w) {
    "use strict";

    var citystate = {};

    citystate.init = function () {
        this
            .clean()
            .setData()
            .start();
    }

    citystate.clean = function(){
        localStorage.removeItem('cfw_citst_states');
        localStorage.removeItem('cfw_citst_ac');
        localStorage.removeItem('cfw_citst_al');
        localStorage.removeItem('cfw_citst_am');
        localStorage.removeItem('cfw_citst_ap');
        localStorage.removeItem('cfw_citst_ba');
        localStorage.removeItem('cfw_citst_ce');
        localStorage.removeItem('cfw_citst_df');
        localStorage.removeItem('cfw_citst_es');
        localStorage.removeItem('cfw_citst_go');
        localStorage.removeItem('cfw_citst_ma');
        localStorage.removeItem('cfw_citst_mg');
        localStorage.removeItem('cfw_citst_ms');
        localStorage.removeItem('cfw_citst_mt');
        localStorage.removeItem('cfw_citst_pa');
        localStorage.removeItem('cfw_citst_pb');
        localStorage.removeItem('cfw_citst_pe');
        localStorage.removeItem('cfw_citst_pi');
        localStorage.removeItem('cfw_citst_pr');
        localStorage.removeItem('cfw_citst_rj');
        localStorage.removeItem('cfw_citst_rn');
        localStorage.removeItem('cfw_citst_ro');
        localStorage.removeItem('cfw_citst_rr');
        localStorage.removeItem('cfw_citst_rs');
        localStorage.removeItem('cfw_citst_sc');
        localStorage.removeItem('cfw_citst_se');
        localStorage.removeItem('cfw_citst_sp');
        localStorage.removeItem('cfw_citst_to');

        return this;
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

        if (!localStorage.getItem('cfw_citst_states_v1')) {
            var haveSelects = false;

            $('select[data-list]:not([data-list-loaded="true"])').each(function () {
                if (haveSelects) return true;
                if ($(this).attr('data-list') == 'states') haveSelects = true;
            });

            if (haveSelects)
                that.getJson('states', null, function () {
                    that.dealSelects();
                });
        }

        if (localStorage.getItem('cfw_citst_states_v1'))
            that.dealSelects();

    }

    citystate.getJson = function (what, $el, cb) {
        var that = this;

        if (what) {

            if (!localStorage.getItem('cfw_citst_' + what + '_v1')) {
                var file = what == 'states' ? 'states.min.json' : 'cities/' + what.toLowerCase() + '.min.json';

                $.getJSON(cfw.pathFile.json + file, function (data) {
                    var dados = $.isArray(data) ? data.sort() : data;
                    localStorage.setItem('cfw_citst_' + what + '_v1', JSON.stringify(dados));
                    if ($el) that.dealData(what, $el, dados);
                    if (typeof (cb) == 'function') cb();
                });
            }

            if ($el && localStorage.getItem('cfw_citst_' + what + '_v1'))
                that.dealData(what, $el, JSON.parse(localStorage.getItem('cfw_citst_' + what + '_v1')));

        }
        else
            console.warn('citystate.getJson: var what = "' + what + '"');
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

            $(document).trigger('citystate:change', ['states', e.currentTarget, $(this).val(), $(this).attr('data-list-group') ]);
        });

        $('[data-list="cities"]').on('change', function (e) {
            $(document).trigger('citystate:change', ['cities', e.currentTarget, $(this).val(), $(this).attr('data-list-group')]);
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

        this.chosenEvent($el);
    }

    citystate.chosenEvent = function ($el) {
        var attr = $el.attr('data-chosen');
        if (typeof attr !== typeof undefined && attr !== false)
            $el.trigger('chosen:updated');
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
            init = $el.attr('data-list-start') ?
                        $el.attr('data-list-start').split(',').length > 1 ?
                            $el.attr('data-list-start').split(',') :
                            $el.attr('data-list-start').toLowerCase() :
                        null;

        $.each(data, function (k, v) {

            var item = v,
                dataEl = '';

            if (what == 'states') {
                if ($el.attr('data-list-initials') == 'true') item = k;
                dataEl += ' data-uf="' + k + '"';
            }

            if (init == v.toLowerCase() || init == k.toString().toLowerCase() || $.inArray(v, init) >= 0)
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

        $(document).trigger('cfw_cities_loaded', [$el]);
        this.chosenEvent($el);
    }

    // commonjs
    if (typeof exports !== "undefined")
        exports.citystate = citystate;
    else
        w.citystate = citystate;

}(typeof global !== "undefined" ? global : this));