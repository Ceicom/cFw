(function (w) {
    "use strict";

    var cfwSubmitForm = {};

    cfwSubmitForm.form = $('[data-submitform]');
    cfwSubmitForm.btn = cfwSubmitForm.form.find('[type="submit"]');

    cfwSubmitForm.dealBtn = function (status) {
        if (!status) status = cfwSubmitForm.btn.attr('disabled');
        cfwSubmitForm.btn.attr('disabled', !status);
    };

    cfwSubmitForm.dealCaptcha = function ($form) {

        var that = this;
        var catpchaResponse = grecaptcha.getResponse();

        if (catpchaResponse) {

            // confirma captcha
            var captcha = $.ajax({
                type: 'POST',
                url: '/modulos/handlers/captcha.ashx',
                data: { 'g-recaptcha-response': catpchaResponse }
            });

            captcha.then(function (data) {

                var r = data.success;

                // se não existir resposta ou a resposta for false
                if (!r || r == 'false') {
                    swal({ title: 'Ops', text: 'Código de verificação inválido, tente novamente.', type: 'info' });
                    grecaptcha.reset();
                    that.dealBtn();
                } else
                    that.submitForm($form);
            });

        }

        else {
            swal({ title: 'Erro', text: 'Preencha o <strong>Captcha</strong> para continuar.', type: 'error' });
            that.dealBtn();
        }
    }

    cfwSubmitForm.FormData = function ($form) {

        var returnData = false;

        if (typeof window.FormData !== 'undefined') {

            returnData = new FormData();

            var inputFile = $form.find('input[type="file"]');
            var formInfo = $('form').serialize().replace(/\+/g, ' ').split('&');

            if (inputFile.length) {

                inputFile.each(function () {
                    if ($(this)[0].files.length)
                        returnData.append($(this).attr('name'), $(this)[0].files[0]);
                });
            }

            for (var i = 0; i < formInfo.length; i++) {

                var info = formInfo[i].split('=');
                var key = info[0];
                var val = decodeURIComponent(info[1]);

                returnData.append(key, val);
            }
        }

        return returnData;
    }

    cfwSubmitForm.submitForm = function ($form) {

        var that = this;
        var type = $form.attr('data-submitform');
        var formData = that.FormData($form) || $('form').serialize();
        var handler = $form.attr('data-handlerform') || '/modulos/handlers/formularios.ashx';

        /**/
        var ajaxRequest = {}
        ajaxRequest.type = 'POST';
        ajaxRequest.url = handler + '?type=' + type;
        ajaxRequest.processData = false;
        ajaxRequest.data = formData;

        if (typeof window.FormData !== 'undefined')
            ajaxRequest.contentType = false;

        $.ajax(ajaxRequest).done(function (data) {

            if (location.search.indexOf('debug=true') > 0)
                console.log(data);

            $(document).trigger('cfw_submitform', [data, $form]);
            that.dealBtn();
        });
    }

    // form submit
    $('form').on('submit', function (e) {

        var form = $('body').attr('data-form');

        if (form) {
            e.preventDefault();
            cfwSubmitForm.dealBtn();

            var $form = $('[data-submitform="' + form + '"]');

            // form com captcha
            if ($form.find('.g-recaptcha').length)
                cfwSubmitForm.dealCaptcha($form);

                // form sem captcha
            else
                cfwSubmitForm.submitForm($form);

        }

    });

    // commonjs
    if (typeof exports !== "undefined")
        exports.cfwSubmitForm = cfwSubmitForm;
    else
        w.cfwSubmitForm = cfwSubmitForm;

}(typeof global !== "undefined" ? global : this));