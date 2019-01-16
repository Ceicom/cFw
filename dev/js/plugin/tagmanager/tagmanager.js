(function (w) {
    "use strict";

    /* exported */
    function TagManager(idGTM) {
        var me = this;

        me.idGTM = idGTM;

        return me;
    }

    TagManager.prototype.init = function () {
        var me = this;

        me.headScript();
        me.bodyScript();

        return me;
    }

    TagManager.prototype.headScript = function () {
        var script = document.createElement('script');
        var firstScript = document.getElementsByTagName('script')[0];

        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtm.js?id=' + this.idGTM;

        firstScript.parentNode.insertBefore(script, firstScript);
    }

    TagManager.prototype.bodyScript = function () {
        var body = document.getElementsByTagName('body')[0];
        var noScript = document.createElement('noscript');
        var iframe = document.createElement('iframe');

        iframe.width = 0;
        iframe.height = 0;
        iframe.style = 'display:none;visibility:hidden';
        iframe.src = 'https://www.googletagmanager.com/ns.html?id=' + this.idGTM;

        noScript.appendChild(iframe);

        body.prepend(noScript);
    }

    /**********************************/

    // commonjs
    if (typeof exports !== "undefined")
        exports.TagManager = TagManager;
    else
        w.TagManager = TagManager;

}(typeof global !== "undefined" ? global : this));