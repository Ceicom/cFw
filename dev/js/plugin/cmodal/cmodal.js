(function (w) {
    "use strict";

    /* exported */
    function cModal(wrapper) {
        this.body = $('body');
    }

    cModal.prototype.init = function ($item) {
        var _ = this;
            _.wrapper = $item.closest('.cfw-modal');

        if ($item.attr('data-modal-class')) _.wrapper.addClass($item.attr('data-modal-class'));

        _.wrapper.on('close', function () {
            _.close();
        });

        return _.open();
    }

    cModal.prototype.open = function () {
        var _ = this;

        _.wrapper.fadeIn('fast', function () {
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

    function checkIdClass(nome) {
        return (nome.charAt(0) != '#' && nome.charAt(0) != '.') ? '#' + nome : nome;
    }

    /**********************************/

    function initLayout() {
        $('[data-modal]').each(function () {

            $(checkIdClass($(this).attr('data-modal')))
                .wrap('<div class="cfw-modal" hidden></div>')
                .wrap('<div class="cfw-modal__pos-conteudo"></div>')
                .wrap('<div class="cfw-modal__conteudo"></div>')
                .attr('hidden', false)
                .closest('.cfw-modal__pos-conteudo').append('<button class="cfw-modal__close-btn js-close-modal" type="button" title="Fechar"></button>')
                .parent().find('iframe').each(function () {
                    $(this).attr('src', $(this).attr('data-src'));
                });
        });
    }

    initLayout();

    /**********************************/

    var form = new cModal();

    $(document).on('click', '[data-modal]', function (e) {
        e.preventDefault();

        var item = $(this).attr('data-modal');

        form.init($(checkIdClass(item)));
    });

    $(document).on('click', function (e) {
        var $el = $(e.target);

        var close = $el.hasClass('js-close-modal') ? true :
                    !$el.closest('.cfw-modal__conteudo').length && !$el.closest('.sweet-alert').length ? true : false;

        if (close && !$('body').hasClass('modal-open')) close = false;

        if ($('.cfw-modal:visible').length && close) $('.cfw-modal:visible').trigger('close');
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