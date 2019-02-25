(function () {
    cfw.invisiblecaptcha.start = function () {

        window.invisibleCaptchaScriptLoaded = function () {
            $('.g-recaptcha').each(function () {
                var item = $(this);
                var id = item.attr('id');
        
                item.addClass('invisible-captcha');

                cfw.invisiblecaptcha.list[id] = grecaptcha.render(id, {
                    'size': 'invisible',
                    'callback': invisibleCaptchaAjax
                });
            });
        };
        
        window.invisibleCaptchaAjax = function (token) {
            cfwSubmitForm.ajaxCaptcha(token);
            return false;
        };
        
        cfw.getJS('//www.google.com/recaptcha/api.js?onload=invisibleCaptchaScriptLoaded&render=explicit');
    }

    cfw.invisiblecaptcha.list = {};             // listagem captchas pagina
    cfw.invisiblecaptcha.active = undefined;    // captcha ativo (que deve ser resetado/validado)
})();