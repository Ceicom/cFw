(function (w) {
    "use strict";

    var cfwValidaForm = function () { };

        cfwValidaForm.prototype.init = function () {
            var that = this;
            this.dealActions();
            
            $(document).on('cfw-falseSubmit',function(){
                $('body').find('[type="submit"]').trigger();
            });

            $('body').find('[type="submit"]').on('click', function (e) {

                var $form = $(this).closest(that.options.form);

                if ($('body').attr('data-form')) $('body').removeAttr('data-form');

                if ($form.length) {
                    var retForm = that.validateForm($form);

                    if (retForm != true)
                        e.preventDefault();

                    $form.attr('data-form-validated', retForm);

                    if (retForm == true && $form.attr('data-submitform'))
                        $('body').attr('data-form', $form.attr('data-submitform'));
                }
            });
        }

        cfwValidaForm.prototype.validateForm = function ($form) {
            var r = true,
                that = this;

            $form.find('[data-validate]').each(function () {
                var type = $(this).attr('data-validate').toLowerCase() || $(this).attr('type').toLowerCase();

                if ($(this).is(':visible') || type == 'hidden') {

                    if (that.validate.hasOwnProperty(type)) {
                        r = that.validate[type]($(this));

                        that.warnCli(type, $(this), r);

                        if (r != true) {
                            $(document).trigger('cfw_validateForm_error', [$form, type, $(this), r]);
                            return false;
                        }

                    } else
                        console.warn('´'+type + '´ não é um tipo de validação existente');

                } else {
                    console.warn('element: ' + ($(this).attr('id') ? '#' + $(this).attr('id') : '[name="' + $(this).attr('name') + '"]') + ';\nvalidate: ' + type + ';\nisHidden: true;');
                }

            });

            return r;
        }

        cfwValidaForm.prototype.validate = {
            //
            clearStr: function (val) {
                return val.replace(/[^\w]/gi, '');
            },

            charsDistinct: function(val){
                return !!!val.match(/^(\d)\1*$/);
            },

            checkOptional: function ($el, callback) {
                if ($el.attr('data-validate-optional') == 'true' && !this.required($el))
                    return true;
                else
                    return callback();
            },

            //
            required: function ($el) {
                var val = $el.val() || '';
                return !!this.clearStr(val.trim());
            },

            fullname: function ($el) {
                var val = $el.val() || '';
                return this.checkOptional($el, function () {
                    return val.trim().split(' ').length > 1;
                });
            },

            email: function ($el) {
                var val = $el.val() || '';
                return this.checkOptional($el, function () {
                    var er = new RegExp(/^[A-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?$/);
                    return !!er.test(val.trim());
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
                var val = $el.val() || '';
                return this.checkOptional($el, function () {
                    var er = new RegExp(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i);
                    return !!er.test(val.trim());
                });
            },

            file: function ($el) {
                if (window.FileReader && window.FileReader.prototype.readAsArrayBuffer) {
                    var files = $el[0].files;

                    if (files.length > 0) {
                        // tamanho
                        if (+$el.attr('data-validate-size') < Math.ceil(files[0].size / 1024))
                            return 'file_size';

                        // extensão
                        var typeFile = files[0].name.substr(-3);
                        var typeLimit = $el.attr('data-validate-ext') || typeFile;
                        if (typeLimit.indexOf(typeFile) < 0)
                            return 'file_ext';

                        return true;
                    }
                    else {
                        return $el.attr('data-validate-optional') == 'true';
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
                    var items = $('[data-validate-group]:visible'),
                        tmpValue,
                        r = true;

                    $.each(items, function () {
                        if (!r) return false;

                        var val = that.clearStr($(this).val());

                        if ($el.attr('data-validate-optional') != 'true' && !val)
                            r = false;

                        else if (typeof (tmpValue) === 'undefined')
                            tmpValue = val;

                        else if (tmpValue != val)
                            r = false;
                    });

                    return r;
                }
            },

            checkbox: function ($el) {
                var name = $el.attr('name');
                var qtdMin = $el.attr('data-validate-qtd').split(',')[0];
                var qtdMax = $el.attr('data-validate-qtd').split(',')[1] || $('input[name="' + name + '"]').length;
                var qtdSel = $('input[name="' + name + '"]:checked:visible').length;

                if (!name) {
                    console.warn('´checkbox´ precisa de um name.')
                    return true;
                }

                if (qtdSel >= 0)
                    return qtdSel >= qtdMin && qtdSel <= qtdMax;

                if (!qtdSel && $el.attr('data-validate-optional') == 'true')
                    return true;

            },

            hidden: function ($el) {
                return !!this.required($el);
            },

            radio: function ($el) {
                var name = $el.attr('name');

                if (!name) {
                    console.warn('´radio´ precisa de um name.')
                    return true;
                }

                return !!$('input[name="' + name + '"]:checked:visible').length;
            }
        }

        cfwValidaForm.prototype.warnCli = function (type, $el, situ) {

            if (situ != true) {

                var msgs = {
                    required: {
                        false: 'Campo obrigatório'
                    },
                    fullname: {
                        false: 'Preencha com seu Nome Completo (Nome Sobrenome)'
                    },
                    email: {
                        false: 'Utilize um email válido'
                    },
                    cpf: {
                        false: 'CPF inválido'
                    },
                    cnpj: {
                        false: 'CNPJ inválido'
                    },
                    url: {
                        false: 'URL inválida'
                    },
                    file: {
                        false: 'Campo obrigatório',
                        file_size: 'Arquivo maior que o permitido (limite {size}',
                        file_ext: 'Extensão do arquivo não permitida, envie: {ext}',
                    },
                    compare: {
                        false: 'Os valores dos campos devem ser iguais'
                    },
                    checkbox: {
                        false: 'Selecione ao menos {qtd} itens'
                    },
                    hidden: {
                        false: 'Campo obrigatório'
                    },
                    radio: {
                        false: 'Selecione uma opção'
                    }
                }

                var msg = $el.attr('data-validate-txt') || msgs[type][situ];

                if (msg.indexOf('{') > 0) {
                    var regex = new RegExp(/({[\w]+})/gi),
                        info = msg.match(regex),
                        nvalue;

                    switch (info[0]) {
                        case '{size}':
                            nvalue = +$el.attr('data-validate-size') / 1024;
                            if (nvalue >= 1)
                                nvalue = nvalue.toFixed(2) + 'MB)';
                            else
                                nvalue = $el.attr('data-validate-size') + 'KB)';
                            break;
                        case '{qtd}':
                            var d = $el.attr('data-validate-qtd').split(',');
                            nvalue = d[0];
                            if (d[1] && d[1] != d[0]) nvalue += ' e no máximo ' + d[1];
                            break;
                        default:
                            nvalue = $el.attr('data-validate-' + info[0].replace(/[{}]/g, ''));
                            break;
                    }

                    msg = msg.replace(info[0], nvalue);
                }

                $el.focus();

                var parentEl = $el.attr('data-validate-target') ? $el.closest($el.attr('data-validate-target')) : $el.parent();

                parentEl.addClass('cfw-input-invalid')

                if (this.options.tooltip)
                    parentEl.attr('data-cfw-tooltip', msg);
            }

            if (situ == true)
                this.resetWarn($el);

        },

        cfwValidaForm.prototype.resetWarn = function ($el) {
            $el.closest(this.options.form).find('.cfw-input-invalid').removeClass('cfw-input-invalid').removeAttr('data-cfw-tooltip');
        }

        cfwValidaForm.prototype.dealActions = function () {

            var $form = $(this.options.form),
                that = this;

            $form.on('keypress', 'input, select, textarea', function (e) {
                if (e.keyCode == 13 && event.target.nodeName.toLowerCase() != 'textarea') {
                    e.preventDefault();
                    $(this).closest(that.options.form).find('[type=submit]:lt(1)').trigger('click');
                }
                else
                    that.resetWarn($(this));
            });

            $form.on('change paste', 'input, select, textarea', function (e) {
                that.resetWarn($(this));
            });
        }

    // commonjs
    if (typeof exports !== "undefined")
        exports.cfwValidaForm = cfwValidaForm;
    else
        w.cfwValidaForm = cfwValidaForm;

}(typeof global !== "undefined" ? global : this));
