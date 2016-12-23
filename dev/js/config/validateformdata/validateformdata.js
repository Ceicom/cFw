(function () {

    cfw.validateformdata.start = function (options) {

        // valida
        if (typeof window.FormData === 'undefined') {

            var infoDiv =
                '<div class="msg-box is-warning">' +
                '    Seu navegador é antigo e não permite envio de arquivos.' +
                '    <strong><a href="https://whatbrowser.org/" target="_blank">Atualizar agora!</a></strong>' +
                '</div>';

            $('input[type="file"]')
                .attr('hidden', true)
                .parent().append(infoDiv);
        }
    }

})();