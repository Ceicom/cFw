(function (w) {
    "use strict";

    var cfwSubmitForm = {};

    cfwSubmitForm.form = $('[data-submitform]');
    cfwSubmitForm.btn = cfwSubmitForm.form.find('[type="submit"]');
    cfwSubmitForm.active = null;

    cfwSubmitForm.dealBtn = function (status) {
        if (!status) status = cfwSubmitForm.btn.attr('disabled');
        cfwSubmitForm.btn.attr('disabled', !status);
    };

    cfwSubmitForm.ajaxCaptcha = function(token){
        var that = this;
        var captcha = $.ajax({
            type: 'POST',
            url: '/modulos/handlers/captcha.ashx',
            data: {
                'g-recaptcha-response': token
            }
        });
    
        captcha.then(function (data) {
            if (!data.success || data.success == 'false') {
                swal({ title: 'Ops', text: 'Código de verificação inválido, tente novamente.', type: 'info' });
                that.dealBtn();
                grecaptcha.reset(cfw.invisiblecaptcha.active);
            } else
                that.submitForm();
        });
    }

    cfwSubmitForm.dealCaptcha = function () {
        var that = this;

        if (grecaptcha.getResponse())
            cfwSubmitForm.ajaxCaptcha(grecaptcha.getResponse());
        else {
            swal({ title: 'Erro', text: 'Preencha o <strong>Captcha</strong> para continuar.', type: 'error' });
            that.dealBtn();
        }
    }

    cfwSubmitForm.FormData = function () {
        var that = this;
        var returnData = false;

        if (typeof window.FormData !== 'undefined') {

            returnData = new FormData();

            var inputFile = that.active.find('input[type="file"]');
            var formInfo = $('form').serialize().replace(/\+/g, ' ').split('&');

            if (inputFile.length) {
                inputFile.each(function () {
                    var input = $(this)[0],
                        name = $(this).attr('name');

                    if (input.files.length) {

                        if ($(this).attr('multiple'))
                            Array.from(input.files).forEach(function(file){
                                returnData.append(name, file);
                            });
                        else
                            returnData.append(name, input.files[0]);
                    }
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

    cfwSubmitForm.submitForm = function () {
        var that = this;
        var type = that.active.attr('data-submitform');
        var formData = that.FormData() || $('form').serialize();
        var handler = that.active.attr('data-handlerform') || '/modulos/handlers/formularios.ashx';

        /**/
        var ajaxRequest = {}
        ajaxRequest.type = 'POST';
        ajaxRequest.url = handler + '?type=' + type;
        ajaxRequest.processData = false;
        ajaxRequest.data = formData;

        if (typeof window.FormData !== 'undefined')
            ajaxRequest.contentType = false;

        $.ajax(ajaxRequest).done(function (data) {
            $(document).trigger('cfw_submitform', [data, that.active]);
            that.dealBtn();

            if (typeof grecaptcha !== 'undefined')
                grecaptcha.reset(cfw.invisiblecaptcha.active);
        });
    }

    // form submit
    $('form').on('submit', function (e) {
        var form = $('body').attr('data-form');

        if (form) {
            e.preventDefault();
            cfwSubmitForm.dealBtn();

            // reset
            cfw.invisiblecaptcha.active = undefined;

            cfwSubmitForm.active = $('[data-submitform="' + form + '"]');
            var captcha = cfwSubmitForm.active.find('.g-recaptcha');

            // form com captcha
            if (captcha.length){
                if(cfw.invisiblecaptcha.list){
                    cfw.invisiblecaptcha.active = cfw.invisiblecaptcha.list[captcha.attr('id')];
                    grecaptcha.execute(cfw.invisiblecaptcha.active);
                }
                else
                    cfwSubmitForm.dealCaptcha();
            }

                // form sem captcha
            else
                cfwSubmitForm.submitForm();

        }
    });

    // commonjs
    if (typeof exports !== "undefined")
        exports.cfwSubmitForm = cfwSubmitForm;
    else
        w.cfwSubmitForm = cfwSubmitForm;

}(typeof global !== "undefined" ? global : this));