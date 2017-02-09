(function (w) {
    "use strict";

    /* exported */
    function cModal(wrapper) {
        this.body = $('body');
    }

    cModal.prototype.init = function ($el) {
        var _ = this,
            keepDoing = true,
            classe;

        _.type = $el.attr('data-modal-type');

        if (_.type == 'img') {
            _.wrapper = $('.cfw-modal.for-img');

            var img = $el.attr('href') || $el.attr('data-modal-img') || null,
                link = $el.attr('data-modal-url') || null,
                classe = $el.attr('data-modal-class');

            //

            var content = '';

            if (img){
                var title = $el.attr('title') ? ' title="' + $el.attr('title') + '" ' : '';

                content += '<img ' + title + ' src="' + img + '" />';

                if (link)
                    content = '<a ' + _.dealLink(link) + '>' + content + '</a>';

                content += '<button class="cfw-modal__close-btn js-close-modal" type="button" title="Fechar"></button>';

                _.wrapper.html(content);
            }
            else
                keepDoing = false;
        }

        if (_.type == 'txt') {
            var item = $el.attr('data-modal'),
                $item = $(checkIdClass(item)),
                classe = $el.attr('data-modal-class') || $item.attr('data-modal-class');

            _.wrapper = $item.closest('.cfw-modal');

            if ($el.attr('data-modal-width')) _.wrapper.find('.cfw-modal__pos-conteudo').css('max-width', $el.attr('data-modal-width') + 'px');

            if ($el.attr('title'))
                _.wrapper.find('.cfw-modal__pos-conteudo').attr('title');
        }

        _.wrapper
            .addClass(classe)
            .on('close', function () {
                _.close();
            });

        return keepDoing ? _.open($el) : false;
    }

    cModal.prototype.dealLink = function (link) {
        var prelink = link.indexOf('@') > 0 ? 'href="mailto:' : 'href="//';
        var aftlink = link.indexOf('@') < 0 ? 'target="_blank"' : '';
        return (link) ? prelink + link.replace(/^[http]+s?:\/\//gi, '') + '"' + aftlink : '';
    }

    cModal.prototype.open = function ($el) {
        var _ = this;
        var bodyClass = 'modal-loaded';

        if ($el.attr('data-modal-lock') != 'false') bodyClass += ' modal-open';

        _.wrapper.fadeIn('fast', function () {
            _.body.addClass(bodyClass);
            $(window).trigger('cfw-modal-open');
        });

        return this;
    }

    cModal.prototype.close = function () {
        var _ = this;

        var classe = _.type == 'img' ? 'cfw-modal for-img' :
                     _.type == 'txt' ? 'cfw-modal' : '';

        _.wrapper.fadeOut('fast', function () {
            _.body.removeClass('modal-open modal-loaded');
            _.wrapper.off('close callClose');

            if (_.type == 'img')
                _.wrapper
                    .removeAttr('class')
                    .addClass(classe);

            $(window).trigger('cfw-modal-close');
        });

        return this;
    }

    /**********************************/

    function checkIdClass(nome) {
        return nome ? (nome.charAt(0) != '#' && nome.charAt(0) != '.') ? '#' + nome : nome : null;
    }

    /**********************************/

    function initLayout() {
        $('[data-modal]').each(function () {

            var formatosImagem = ['jpg', 'peg', 'png', 'gif', 'bmp'];
            var type = 'txt';
            var img = $(this).attr('href') || $(this).attr('data-modal-img');
            if(img) type = $.inArray(img.slice(-3), formatosImagem) >= 0 ? 'img' : 'txt';

            $(this).attr('data-modal-type', type);

            if ($(this).attr('data-auto-modal') && !aModal) aModal = $(this);

            if (type == 'txt') {
                var $el = $(checkIdClass($(this).attr('data-modal')));

                if(!$el.parent().hasClass('cfw-modal__conteudo'))
                    $el
                        .wrap('<div class="cfw-modal" hidden></div>')
                        .wrap('<div class="cfw-modal__pos-conteudo"></div>')
                        .wrap('<div class="cfw-modal__conteudo"></div>')
                        .attr('hidden', false)
                        .closest('.cfw-modal__pos-conteudo').append('<button class="cfw-modal__close-btn js-close-modal" type="button" title="Fechar"></button>')
                        .parent().find('iframe').each(function () {
                            $(this).attr('src', $(this).attr('data-src'));
                        });
            }

            if (type == 'img' && !$('.cfw-modal.for-img').length) {
                $('body').append('<div class="cfw-modal for-img" hidden></div>');
            }

        });
    }

    initLayout();

    /**********************************/

    var form = new cModal();

    $(document).on('click', '[data-modal]', function (e) {
        e.preventDefault();
        form.init($(this));
    });

    $(document).on('click', function (e) {
        var $el = $(e.target);

        var close = $el.hasClass('js-close-modal') ? true :
                    !$el.closest('.cfw-modal__conteudo').length && !$el.closest('.sweet-alert').length ? true : false;

        if (close && !$('body').hasClass('modal-loaded')) close = false;

        if ($('.cfw-modal:visible').length && close) $('.cfw-modal:visible').trigger('close');
    });

    $(document).on('keyup', function (e) {
        if ($('.cfw-modal:visible').length && e.keyCode == 27) $('.cfw-modal:visible').trigger('close');
    });

    if ($('[data-modal][data-auto-modal]').length)
        $('[data-modal][data-auto-modal]').trigger('click');


    /**********************************/

    // commonjs
    if (typeof exports !== "undefined")
        exports.cModal = cModal;
    else
        w.cModal = cModal;

}(typeof global !== "undefined" ? global : this));