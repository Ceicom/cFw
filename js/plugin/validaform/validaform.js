(function (w) {
    "use strict";

    var cfwValidaForm = function () { };

        cfwValidaForm.prototype.init = function () {
            var that = this;
            this.dealActions();

            $('body').find('[type="submit"]').on('click', function (e) {

                var $form = $(this).closest(that.options.form);

                if ($form.length)
                {
                    var result = that.validaForm($form);

                    e.preventDefault();
                    console.info('submit by click btn');
                    console.info('resultado:' + result);
                }

                // informa ao cliente qual "form" esta sendo submitado
                //$('body').attr('data-form', $form.attr('id') || $form.attr('class'));

                //if (valida($form) == 0) return false;
            });
        }

        cfwValidaForm.prototype.validaForm = function ($form) {
            var r = true,
                that = this;

            $form.find('[data-validate]').each(function () {
                var type = $(this).attr('data-validate').toLowerCase();
                var val  = $(this).val();

                console.info(type);

                if (that.valida.hasOwnProperty(type)) {
                    r = that.valida[type]($(this));
                    if(!r) return false;
                } else {
                    console.warn(type + ' não é um tipo de validação existente');
                }

            });

            return r;
        }

        cfwValidaForm.prototype.valida = {
            //
            clearStr: function (val) {
                return val.replace(/[^\w]/gi, '');
            },

            charsDistinct: function(val){
                return !!!val.match(/^(\d)\1*$/);
            },

            checkOptional: function ($el, cb) {
                if ($el.attr('data-validate-optional') == 'true' && !this.required($el)) {
                    console.info('x1.0');
                    return true;
                }
                else
                    return cb();
            },

            //
            required: function ($el) {
                return !!this.clearStr($el.val().trim());
            },

            fullname: function ($el) {
                return this.checkOptional($el, function () {
                    return $el.val().trim().split(' ').length > 1;
                });
            },

            email: function ($el) {
                return this.checkOptional($el, function () {
                    var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
                    return !!er.test($el.val().trim());
                });
            },

            cpf: function ($el) {
                var that = this;

                return that.checkOptional($el, function () {
                    var val = that.clearStr($el.val());

                    // Elimina CPFs invalidos conhecidos e Qtd Chars
                    if (val.length != 11 || !that.charsDistinct(val))
                        return false;

                    // Valida 1o digito
                    var add = 0;
                    for (var i = 0; i < 9; i++)
                        add += parseInt(val.charAt(i)) * (10 - i);
                    var rev = 11 - (add % 11);
                    if (rev == 10 || rev == 11)
                        rev = 0;
                    if (rev != parseInt(val.charAt(9)))
                        return false;

                    // Valida 2o digito
                    var add = 0;
                    for (var i = 0; i < 10; i++)
                        add += parseInt(val.charAt(i)) * (11 - i);
                    var rev = 11 - (add % 11);
                    if (rev == 10 || rev == 11)
                        rev = 0;
                    if (rev != parseInt(val.charAt(10)))
                        return false;

                    return true;
                });
            },

            cnpj: function ($el) {
                var that = this;

                return that.checkOptional($el, function () {
                    var val = that.clearStr($el.val());

                    // Elimina CNPJs invalidos conhecidos
                    if (val.length != 14 || !that.charsDistinct(val))
                        return false;

                    // Valida DVs
                    var tamanho = val.length - 2
                    var numeros = val.substring(0, tamanho);
                    var digitos = val.substring(tamanho);
                    var soma = 0;
                    var pos = tamanho - 7;
                    for (var i = tamanho; i >= 1; i--) {
                        soma += numeros.charAt(tamanho - i) * pos--;
                        if (pos < 2)
                            pos = 9;
                    }
                    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                    if (resultado != digitos.charAt(0))
                        return false;

                    var tamanho = tamanho + 1;
                    var numeros = val.substring(0, tamanho);
                    var soma = 0;
                    var pos = tamanho - 7;
                    for (i = tamanho; i >= 1; i--) {
                        soma += numeros.charAt(tamanho - i) * pos--;
                        if (pos < 2)
                            pos = 9;
                    }
                    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                    if (resultado != digitos.charAt(1))
                        return false;

                    return true;
                });
            },

            url: function ($el) {
                return this.checkOptional($el, function () {
                    var er = new RegExp(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i);
                    return !!er.test($el.val().trim());
                });
            },

            file: function ($el) {
                if (window.FileReader && window.FileReader.prototype.readAsArrayBuffer) {
                    var files = $el[0].files;

                    if (files.length > 0) {
                        var sizeLimit = $el.attr('data-validate-size');
                        var typeLimit = $el.attr('data-validate-ext');

                        if (!sizeLimit && !typeLimit) {
                            console.warn('´file´ precisa de mais um parametro para validação (data-validate-size ou data-validate-ext)');
                            return true;
                        }

                        if (+sizeLimit < Math.ceil(files[0].size / 1024)) {
                            console.info('size >');
                            return false;
                        }

                        if (typeLimit.indexOf(files[0].name.substr(-3)) < 0) {
                            console.info('ext !=');
                            return false;
                        }

                        return true;
                    }
                    else {
                        return false;
                    }
                } else {
                    console.warn('FileReader API Not Supported');
                    return true;
                }
            },

            compare: function ($el) {
                var group = $el.attr('data-validate-group');
                var that = this;

                if(!group){
                    console.warn('Obrigatório parametro ´data-validate-group´ com a validação ´Compare´');
                    return true;
                }

                if(group){
                    var itens = $('[data-validate-group]'),
                        tmpValue,
                        r = true;

                    $.each(itens, function () {
                        if (!r) return false;

                        var val = that.clearStr($(this).val());

                        if (!val)
                            r = false;

                        else if (typeof (tmpValue) === 'undefined')
                            tmpValue = val;

                        else if (tmpValue != val)
                            r = false;
                    });

                    return r;
                }
            },

            checkbox: function(val, $el){
                var qtd = $el.attr('data-validate-qtd');
                var name = $el.attr('name');

                if (!name) {
                    console.warn('´checkbox´ precisa de um name.')
                    return true;
                }

                return $('input[name="' + name + '"]:checked').length >= qtd;
            }
        }

        cfwValidaForm.prototype.dealActions = function () {

            var $form = $(this.options.form);

            // keypress
            $form.on('keypress', 'input, select, textarea', function (e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    console.info('submit by enter');
                }

                //if (e.keyCode == 13 && recuperaTipo($(this)) != 'textarea') {
                //    e.preventDefault();
                //    $(e.currentTarget).closest(config.idForms).find('input[type=submit]:not([disabled]), button[type=submit]:not([disabled])').trigger('click');
                //} else
                //    resetForm($(this).closest(config.idForms));
            });

            // change
            $form.on('change', 'input, select, textarea', function (e) {
                //if ((recuperaTipo($(this)) == 'select') || (recuperaTipo($(this)) == 'file')) resetForm($(this).closest(config.idForms));
            });

            // past
            $form.on('paste', 'input, select, textarea', function (e) {
                //resetForm($(this).closest(config.idForms));
            });

            // click
            $form.on('click', 'input, select, textarea', function (e) {
                //if ($.inArray(recuperaTipo($(this)), ['checkbox', 'radio']) != -1) resetForm($(this).closest(config.idForms));
            });
        }

    // commonjs
    if (typeof exports !== "undefined")
        exports.cfwValidaForm = cfwValidaForm;
    else
        w.cfwValidaForm = cfwValidaForm;

}(typeof global !== "undefined" ? global : this));












//function validaForm(settings) {

//    // options
//    var config = {
//        idForms: '.formee'
//    }

//    if (settings) { $.extend(config, settings); }

//    var tp_error_msg;
//    var tp_error_class = 'tooltip erro always baixo';
//    var timeout_error;

//    // keypress
//    $(config.idForms).on('keypress', 'input, select, textarea', function (e) {
//        if (e.keyCode == 13 && recuperaTipo($(this)) != 'textarea') {
//            e.preventDefault();
//            $(e.currentTarget).closest(config.idForms).find('input[type=submit]:not([disabled]), button[type=submit]:not([disabled])').trigger('click');
//        } else
//            resetForm($(this).closest(config.idForms));
//    });

//    // change
//    $(config.idForms).on('change', 'input, select, textarea', function (e) {
//        if ((recuperaTipo($(this)) == 'select') || (recuperaTipo($(this)) == 'file')) resetForm($(this).closest(config.idForms));
//    });

//    // past
//    $(config.idForms).on('paste', 'input, select, textarea', function (e) {
//        resetForm($(this).closest(config.idForms));
//    });

//    // click
//    $(config.idForms).on('click', 'input, select, textarea', function (e) {
//        if ($.inArray(recuperaTipo($(this)), ['checkbox', 'radio']) != -1) resetForm($(this).closest(config.idForms));
//    });

//    // localiza o botão clicado dentro do identificador de form passado
//    $('body').find('input[type=submit],  button[type=submit]').on('click', function () {
//        var $form = $(this).closest(config.idForms);

//        // informa ao cliente qual "form" esta sendo submitado
//        $('body').attr('data-form', $form.attr('id') || $form.attr('class'));

//        if (valida($form) == 0) return false;
//    });

//    var i = 0;

//    // função de validar
//    function valida(form) {

//        var valueReturn = 1;

//        if ($('#style_cFw2013_error').length != 1)
//            $('head').append("<style id='style_cFw2013_error'>.cFw2013_input-erro{border:1px solid #b01717!important;color:#b01717!important;background:#fad0d0!important}.cFw2013_input-erro::-webkit-input-placeholder{color:#b01717}.cFw2013_input-erro::-moz-placeholder{color:#b01717}.cFw2013_input-erro:-ms-input-placeholder{color:#b01717}.cFw2013_input-erro::-ms-clear{display:none};</style>");

//        // remove qualquer notificação de erro ativa no formulário
//        resetForm(form);

//        // localiza cada elemento necessitando de validação
//        form.find('[data-validate]').each(function () {

//            var $this = $(this);
//            var tipoValida = $this.attr('data-validate');
//            var valueValida = $this.val();
//            var tipoCampo = recuperaTipo($this);

//            // se o campo estiver oculto ou desativado pula verificação
//            if (!$this.is(':visible') || $this.attr('disabled'))
//                tipoValida = null;

//            // se for select e valor for 0 significa que não tem nada selecionado
//            if (tipoCampo == 'select' && valueValida == 0)
//                valueValida = null;

//            // se for radio confirma se tem algum marcado
//            if (tipoCampo == 'radio') {
//                nameCampo = $(this).attr('name');
//                valueValida = null;

//                form.find('input[name=' + nameCampo + ']').each(function () {
//                    if ($(this).is(':checked'))
//                        valueValida = $(this).val();
//                });
//            }

//            // se for checkbox confirma se esta marcado
//            if (tipoCampo == 'checkbox') {
//                valueValida = null;

//                if ($(this).is(':checked'))
//                    valueValida = 'checkado';
//            }

//            // se o campo for date ele vem no padrão americano... então ele inverte a data para a validação
//            if (tipoCampo == 'date')
//                valueValida = valueValida.split('-').reverse().join('/');

//            // gera mensagem de erro de acordo com tipo de validação
//            switch (tipoValida) {
//                case 'require':
//                    tp_error_msg = 'Campo obrigatório.';
//                    break;
//                case 'fullname':
//                    tp_error_msg = 'Insira um Nome Completo. Ex. Carlos Daniel.';
//                    break;
//                case 'email':
//                    tp_error_msg = 'O email digitado é inválido.';
//                    break;
//                case 'number':
//                    tp_error_msg = 'Somente números.';
//                    break;
//                case 'cpfcnpj':
//                    var place = $this.attr('data-placeholder') || $this.attr('placeholder') || $this.parent().find('label').text() || 'CPF/CNPJ inválido!';
//                    tp_error_msg = limpaString(place) + ' inválido!';
//                    break;
//                case 'cep':
//                    tp_error_msg = 'Insira um CEP válido.';
//                    break;
//                case 'data':
//                    tp_error_msg = 'A data repassada é inválida.';
//                    break;
//                case 'senha':
//                    tp_error_msg = 'As senhas não são iguais...';
//                    break;
//            }

//            // inicia verificação de acordo com tipo de validação
//            switch (tipoValida) {
//                case 'require':
//                    valueReturn = require(valueValida);
//                    if (valueReturn == 0) {
//                        showError($this);
//                        return false;
//                    }
//                    break;
//                case 'fullname':
//                    valueReturn = fullname(valueValida);
//                    if (valueReturn == 0) {
//                        showError($this);
//                        return false;
//                    }
//                    break;
//                case 'email':
//                    valueReturn = mail(valueValida);
//                    if (valueReturn == 0) {
//                        showError($this);
//                        return false;
//                    }
//                    break;
//                case 'number':
//                    valueReturn = number(valueValida);
//                    if (valueReturn == 0) {
//                        showError($this);
//                        return false;
//                    }
//                    break;
//                case 'cpfcnpj':
//                    valueReturn = cpfcnpj(valueValida);
//                    if (valueReturn == 0) {
//                        showError($this);
//                        return false;
//                    }
//                    break;
//                case 'cep':
//                    valueReturn = cep(valueValida);
//                    if (valueReturn == 0) {
//                        showError($this);
//                        return false;
//                    }
//                    break;
//                case 'data':
//                    valueReturn = data(valueValida);
//                    if (valueReturn == 0) {
//                        showError($this);
//                        return false;
//                    }
//                    break;
//                case 'senha':
//                    var grupoSenha = ($this.attr('data-senha-group')) ? $this.attr('data-senha-group') : null;
//                    valueReturn = senha(valueValida, grupoSenha);
//                    if (valueReturn == 0) {
//                        showError($this);
//                        return false;
//                    }
//                    break;
//                default:
//                    console.error(tipoValida + ' não é definido como um tipo de validação');
//                    break;
//            }

//        });

//        return valueReturn;
//    };

//    // adiciona tooltip e pinta campo
//    function showError(campo) {
//        campo.addClass('cFw2013_input-erro');
//        campo.parent().append('<div class="' + tp_error_class + '" data-tooltip="' + tp_error_msg + '"></div>');
//        campo.closest(config.idForms).find('input[type=submit]').attr('disabled', 'true');
//        campo.focus();

//        if (timeout_error) clearTimeout(timeout_error);

//        timeout_error = setTimeout(function () {
//            resetForm(campo.closest(config.idForms));
//        }, 5000);
//    };

//    // recupera tipo do campo
//    function recuperaTipo(campo) {

//        var tCampo = campo.get(0).nodeName.toLowerCase();

//        // determina tipo do input
//        switch (tCampo) {
//            case 'input':
//                tCampo = campo.attr('type');
//                break;
//        }

//        return tCampo;
//    };

//    // reset form (remove qualquer indicio de aviso de erro)
//    function resetForm(form) {

//        if (timeout_error) clearTimeout(timeout_error);

//        var fSearch = form.find('.cFw2013_input-erro');

//        if (fSearch.length) {
//            fSearch.parent().find('.tooltip').remove();
//            fSearch.removeClass('cFw2013_input-erro');
//            form.find('input[type=submit], button').removeAttr('disabled');
//        }
//    };

//    // remove caracteres especiais da string
//    function limpaString(string) {
//        var er = /\^|~|\?|,|\*|\.|:|\/|\-/g;
//        return string.replace(er, "");
//    }

//    // ------------------------------//
//    /* FUNÇÕES PARA VALIDAÇÃO DO FORM */
//    // ------------------------------//

//    // required Function
//    function require(val) {
//        if (val) {
//            if (val.replace(/^\s+|\s+$/g, '') == '')
//                return 0;
//            else
//                return 1;
//        } else
//            return 0;

//    }

//    // fullname Function
//    function fullname(val) {
//        if (require(val) != 0)
//            if ($.trim(limpaString(val)).split(' ').length > 1)
//                return 1;
//            else
//                return 0;
//        else
//            return 0;
//    }

//    // mail Function
//    function mail(val) {
//        if (require(val) != 0) {
//            var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
//            if (!er.test(val))
//                return 0;
//            else
//                return 1;
//        }
//        else
//            return 0;
//    }

//    // number Function
//    function number(val) {

//        if (require(val) != 0) {
//            var er = new RegExp(/^[0-9]{1,}$/);

//            if (er.test(limpaString(val)))
//                return 1;
//            else
//                return 0;
//        }
//        else
//            return 0;
//    }

//    // cpf e cnpj Function
//    function cpfcnpj(val) {
//        var add, rev, tamanho, numeros, digitos, soma, pos, resultado;

//        if (require(val) != 0) {

//            var val = limpaString(val);

//            if (val.length < 11 || val.length > 14)
//                return 0;

//            // cpf
//            if (val.length == 11) {

//                // Elimina CPFs invalidos conhecidos
//                for (var i = 0; i < 10; i++) {
//                    var valT = '';
//                    for (var j = 0; j < 11; j++)
//                        valT = valT + i;
//                    if (val == valT)
//                        return 0;
//                }

//                add = 0;
//                for (i = 0; i < 9; i++)
//                    add += parseInt(val.charAt(i)) * (10 - i);
//                rev = 11 - (add % 11);
//                if (rev == 10 || rev == 11)
//                    rev = 0;
//                if (rev != parseInt(val.charAt(9)))
//                    return 0;

//                add = 0;
//                for (i = 0; i < 10; i++)
//                    add += parseInt(val.charAt(i)) * (11 - i);
//                rev = 11 - (add % 11);
//                if (rev == 10 || rev == 11)
//                    rev = 0;
//                if (rev != parseInt(val.charAt(10)))
//                    return 0;

//                return 1;

//            }
//                // cnpj
//            else if (val.length == 14) {

//                // Elimina CNPJs invalidos conhecidos
//                for (var i = 0; i < 10; i++) {
//                    var valT = '';
//                    for (var j = 0; j < 11; j++)
//                        valT = valT + i;
//                    if (val == valT)
//                        return 0;
//                }

//                // Valida DVs
//                tamanho = val.length - 2
//                numeros = val.substring(0, tamanho);
//                digitos = val.substring(tamanho);
//                soma = 0;
//                pos = tamanho - 7;
//                for (i = tamanho; i >= 1; i--) {
//                    soma += numeros.charAt(tamanho - i) * pos--;
//                    if (pos < 2)
//                        pos = 9;
//                }
//                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
//                if (resultado != digitos.charAt(0))
//                    return 0;

//                tamanho = tamanho + 1;
//                numeros = val.substring(0, tamanho);
//                soma = 0;
//                pos = tamanho - 7;
//                for (i = tamanho; i >= 1; i--) {
//                    soma += numeros.charAt(tamanho - i) * pos--;
//                    if (pos < 2)
//                        pos = 9;
//                }
//                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
//                if (resultado != digitos.charAt(1))
//                    return 0;

//                return 1;

//            }
//                // numero de caracteres não é suficiente para a validação
//            else
//                return 0;

//        } else
//            return 0;
//    }

//    // cep Function
//    function cep(val) {

//        if (require(val) != 0) {
//            if (number(val) != 0) {
//                if (limpaString(val).length == 8)
//                    return 1;
//                else
//                    return 0;
//            }
//            else
//                return 0;
//        }
//        else
//            return 0;
//    }

//    // data Function
//    function data(val) {

//        if (require(val) != 0) {

//            var er = /^(((0[1-9]|[12][0-9]|3[01])([-.\/])(0[13578]|10|12)([-.\/])(\d{4}))|(([0][1-9]|[12][0-9]|30)([-.\/])(0[469]|11)([-.\/])(\d{4}))|((0[1-9]|1[0-9]|2[0-8])([-.\/])(02)([-.\/])(\d{4}))|((29)(\.|-|\/)(02)([-.\/])([02468][048]00))|((29)([-.\/])(02)([-.\/])([13579][26]00))|((29)([-.\/])(02)([-.\/])([0-9][0-9][0][48]))|((29)([-.\/])(02)([-.\/])([0-9][0-9][2468][048]))|((29)([-.\/])(02)([-.\/])([0-9][0-9][13579][26])))$/;

//            if (!er.test(val))
//                return 0;
//            else
//                return 1;
//        }
//        else
//            return 0;
//    }

//    // senha Function
//    function senha(val, grupo) {

//        var searchGrupo = $('[data-senha-group=' + grupo + ']').closest($(config.idForms)).find('[data-senha-group=' + grupo + ']');

//        if (searchGrupo.length == 2) {

//            if (require(val) != 0) {
//                var F, tmpString = false;

//                searchGrupo.each(function () {

//                    if (!tmpString)
//                        tmpString = $(this).val();
//                    else {
//                        if (tmpString == $(this).val())
//                            F = 1
//                        else
//                            F = 0;
//                    }
//                });

//                return F;
//            }
//            else
//                return 0;
//        }
//        else
//            return 1;  // não vai haver validação pois não existe um par para comparar
//    }

//};