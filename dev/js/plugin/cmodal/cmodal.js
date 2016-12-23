(function (w) {
    "use strict";

    /* options */
    var config = {
        colorBtn: 'yellow',
        parent: 'body'
    }

    //
    if (cfw.cmodal.options) { $.extend(config, cfw.cmodal.options); }

    /* exported */
    function cModal(wrapper) {
        this.wrapper = $('.cfw-modal');
        this.body = $('body');
    }

    cModal.prototype.init = function () {
        var _ = this;

        _.wrapper.on('close', function () {
            _.close();
        });

        return _.open();
    }

    cModal.prototype.open = function () {
        var _ = this;

        _.wrapper
            .find('.cfw-modal__conteudo').html(_.content.html()).end()
            .fadeIn('fast', function () {
                _.body.addClass('modal-open');

                $(window).trigger('cfw-modal-open');
            });

        return this;
    }

    cModal.prototype.close = function () {
        var _ = this;

        _.wrapper.fadeOut('fast', function () {
            _.body.removeClass('modal-open');
            _.wrapper.off('close callClose');

            $(window).trigger('cfw-modal-close');
        });

        return this;
    }

    /**********************************/

    function generateHtml() {

        if (!$('.cfw-modal').length) {

            var styleBtn = 'style="background: '+config.colorBtn+';"';

            var html =
                '<div class="cfw-modal" id="js-modal" hidden>' +
                '    <div class="cfw-modal__pos-conteudo">' +
                '        <button class="cfw-modal__close-btn js-close-modal" type="button" ' + styleBtn + ' title="Fechar"></button>' +
                '        <div class="cfw-modal__conteudo"></div>' +
                '    </div>' +
                '</div>';

            $(config.parent).append(html);
        }
    }

    generateHtml();

    /**********************************/

    var form = new cModal();

    $(document).on('click', '[data-modal]', function (e) {
        e.preventDefault();

        var item = $(this).attr('data-modal');

        // valida id ou classe
        if (item.charAt(0) != '#' && item.charAt(0) != '.') item = '#' + item;

        form.content = $(item);
        form.init();
    });

    $(document).on('click', function (e) {
        var $el = $(e.target);

        if (($el.hasClass('js-close-modal') || !$el.closest('.cfw-modal__conteudo').length) && $('body').hasClass('modal-open')) {
            if ($('.cfw-modal:visible').length) $('.cfw-modal:visible').trigger('close');
        }
    });

    $(document).on('keyup', function (e) {
        if ($('.cfw-modal:visible').length && e.keyCode == 27) $('.cfw-modal:visible').trigger('close');
    });

    /**********************************/

    // commonjs
    if (typeof exports !== "undefined")
        exports.cModal = cModal;
    else
        w.cModal = cModal;

}(typeof global !== "undefined" ? global : this));