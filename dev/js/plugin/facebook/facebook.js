(function (w) {
    'use strict';

    /* exported */
    var facebook = function () { };

    facebook.prototype._formatTemplate = function (template, data) {
        var replacer = function (match, p1) {
            return data[p1];
        }
        return template.replace(/\[(\w*)\]/g, replacer);
    }

    facebook.prototype.init = function (options) {
        var me = this;

        options = options || {};

        options = {
            appId: options.appId,
            pageId: options.pageId,
            access_token: options.access_token,
            fields: options.fields || 'full_picture,message,permalink_url,type',
            limit: options.limit || 12,
            wrapper: options.wrapper || 'body',
            template: options.template || '<div><img src="[full_picture]"><br>' +
                '<p>[message]</p><br>' +
                '<a href="[permalink_url]" target="_blank">Ver Mais</a></div>',
            insertionMethod: options.insertionMethod || 'html',
            callback: options.callback || function () { },
        }

        if (!options.appId)
            throw new Error('É necessario passar o ID do APP');

        if (!options.pageId)
            throw new Error('É necessario passar o ID da página');

        if (!options.access_token)
            throw new Error('É necessario passar o token de acesso do APP do Facebook');

        FB.init({ appId: options.appId, version: 'v3.2' });

        FB.api('/' + options.pageId + '/posts?fields=' + options.fields + '&limit=' + options.limit, {
            access_token: options.access_token
        }, function (response) {
            var html = '';

            if (response.error)
                console.error(response.error);

            $(response.data).each(function (k, e) {
                html += me._formatTemplate(options.template, e);
            });

            $(options.wrapper).html(html);

            options.callback();
        });

        return me;
    }

    /**********************************/

    // commonjs
    if (typeof exports !== 'undefined')
        exports.facebook = facebook;
    else
        w.facebook = facebook;

}(typeof global !== 'undefined' ? global : this));