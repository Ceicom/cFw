/*
 * Retorna a largura (width) ou altura (height) da janela.
 *
 * @name        wSize
 * @param       {String} ´h´ para height e ´w´ para width
 * @return      {Number} resultado
 * @sample      if(wSize('w') > 800) {};
 */

var wSize = function (type) {
    if (type === 'h') return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (type === 'w') return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};

/************************************************************/

/*
 * Captura parametro passado via GET na URL
 *
 * @name        getUrlParameter
 * @param       {String} nome parametro a ser capturado
 * @return      {String} resultado
 * @sample      var x = getURLParameter('id');
 */

var getUrlParameter = function(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
};

/************************************************************/

/*
 * Trata a uma string contendo uma data retornando um objeto com suas propriedades
 *
 * @name        dealData
 * @param       {String} Data a ser tratada
 *              Deve ser passado no formato pt-BR, ex: ´16/12/2016´ ou ´16/12/2016 14:12:00´
 * @return:     {Object}
 *              {
 *                  day         // nº dia -> 01
 *                  month       // nº mês -> 12
 *                  year        // nº ano -> 2016
 *                  monthAbr    // nome abreviado mês (3 caracteres) -> dez
 *                  monthExt    // nome por extenso do mês -> dezembro
 *                  fullHour    // horario completo -> 12:10:00
 *                  hour        // nº hora -> 12
 *                  minute      // nº minuto -> 10
 *                  second      // nº segundos -> 00
 *              }
 * @sample      var data = '16/12/2016 14:12:00';
 *              console.info(data.monthExt); // imprime Dezembro
 */

var dealData = function (data) {
    var r = {};
    var date = data.split(' ');
    var monthExt = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    r.datetime = date[0].split('/').reverse().join('-');
    r.day = date[0].split('/')[0];
    r.monthAbr = monthExt[date[0].split('/')[1] - 1].substring(0, 3);
    r.monthExt = monthExt[date[0].split('/')[1] - 1];
    r.month = date[0].split('/')[1];
    r.year = date[0].split('/')[2];

    if (data.indexOf(' ') > -1) {
        r.fullhour = date[1].split(':')[0] + ':' + date[1].split(':')[1];
        r.hour = date[1].split(':')[0];
        r.minute = date[1].split(':')[1];
        r.second = date[1].split(':')[2] || '00';
    }

    return r;
};


/************************************************************/

/*
 * Transforma datas do padrão C#/entity para pt-br
 *
 * @name        dealDataEntity
 * @param       {Obj}
 * @param       {Obj.data}      {String}    Data que será convertida, deve ser enviada seguindo os padrões: 2014-10-05T12:20 ou 2014-10-05
 * @param       {Obj.onlyDate}  {Bolean}    Retornar somente data? removendo horas?
 * @param       {Obj.hourAbrev} {String}    Abreviação da hora, default = h;
 * @param       {Obj.detail}    {Bolean}    Retornar data tratada pela função dealData? ignora parametros 'hourAbrev'
 *  
 * @return      {String} data convertida
 * @sample      console.info(dealDataEntity({ data: '2014-10-05T12:20' }));                     // imprime 05/10/2014 12:20h
 * @sample      console.info(dealDataEntity({ data: '2014-10-05T12:20', onlyDate: true }));     // imprime 05/10/2014
 * @sample      console.info(dealDataEntity({ data: '2014-10-05T12:20', hourAbrev: 'hrs' }));   // imprime 05/10/2014 12:20hrs
 * @sample      console.info(dealDataEntity({ data: '2014-10-05T12:20', detail: true }));       // ver retorno função dealData
 */
var dealDataEntity = function (params) {
    // configurações
    var data = params.data,
        onlyDate = params.onlyDate,
        hourAbrev = params.hourAbrev,
        detail = params.detail;

    // geral
    var hourAb = hourAbrev || 'h',
        info = data.split('T'),
        date = '';

    // data
    var dateInfo = info[0] ? info[0].split('-') : [],
        day = dateInfo[2],
        month = dateInfo[1],
        year = dateInfo[0];

    // hora
    var hourInfo = info[1] ? info[1].split(':') : [],
        hour = hourInfo[0],
        min = hourInfo[1];

    // retorno data
    if (+day && +month && +year > 1)
        date = day + '/' + month + '/' + year;

    // retorno hora
    if (!onlyDate && +hour)
        date += ' ' + hour + ':' + min + hourAb;

    // retorno detalhes
    if (detail) {
        if (!onlyDate && +hour)
            date = date.replace(hourAb, '');

        return dealData(date);
    }
    // retorno
    else
        return date;
};

/************************************************************/

/*
 * Substitui acentos pela caracter simples correspondente, remove pontos e
 * troca demais caracteres especiais por hifen
 *
 * @name        clearString
 * @param       {String} valor a ser tratado
 * @return      {String} resultado
 * @sample      console.info(clearString('ação.c|c.é')); // imprime acaoc-ce
 */

var clearString = function (string) {
    var retorno = string.toLowerCase();
    // faz as substituições dos acentos
    retorno = retorno.replace(/[á|ã|â|à]/gi, "a");
    retorno = retorno.replace(/[é|ê|è]/gi, "e");
    retorno = retorno.replace(/[í|ì|î]/gi, "i");
    retorno = retorno.replace(/[õ|ò|ó|ô]/gi, "o");
    retorno = retorno.replace(/[ú|ù|û]/gi, "u");
    retorno = retorno.replace(/[ç]/gi, "c");
    retorno = retorno.replace(/[ñ]/gi, "n");
    retorno = retorno.replace(/[á|ã|â]/gi, "a");
    // remove . (ponto)
    retorno = retorno.replace(/\./gi, "");
    // faz a substituição dos espaços e outros caracteres por - (hífen)
    retorno = retorno.replace(/\W/gi, "-");
    // remove - (hífen) duplicados
    retorno = retorno.replace(/(\-)\1+/gi, "-");

    return retorno;
};

/************************************************************/

/*
 * Altera apresentação do texto deixando somente a primeira letra maiúscula
 *
 * @name        capitalizeStr
 * @param       {String} valor a ser ´capitalizado´
 * @param       {Bolean} fazer ´capitalizamento´ em todas palavras ou somente na primeira da string
 * @param       {Number} quantidade de caracteres minimos de uma palavra para "capitalizar" (padrão = 2)
 * @return      {String} resultado
 * @sample      console.info(capitalize('boa ventura de são roque'));           // imprime Boa ventura de são roque
 * @sample      console.info(capitalize('boa ventura de são roque', true));     // imprime Boa Ventura de São Roque
 * @sample      console.info(capitalize('boa ventura de são roque', true, 1));  // imprime Boa Ventura De São Roque
 */

var capitalizeStr = function (string, eachWord, limit) {

    if (!string) return '';
    if (!limit) limit = 2;

    var str = string.toLowerCase();

    if (eachWord)
        str = str.replace(/[\wÀ-ú]\S*/gi, function (txt) {
            return txt.length > limit ? txt.charAt(0).toUpperCase() + txt.substr(1) : txt;
        });
    else
        str = str.charAt(0).toUpperCase() + str.slice(1);

    return str;
};

/************************************************************/

/*
 * Manipula Cookies do navegador
 *
 * @name        cookies
 *
 * @prototype   create
 * @param       {String} nome do cookie
 * @param       {String} valor do cookie
 * @param       {Number} dias de validade do cookie
 * @sample      cookies.create('cookie1', 'valorcookie1', 2); // cria um cookie com o nome de ´cookie1´, com o valor de ´valorcookie1´ valido por ´2´ dias
 *
 * @prototype   read
 * @param       {String} nome do cookie
 * @return      {String} valor do cookie ou null se o cookie não existir
 * @sample      cookies.read('cookie1'); // retorna conforme exemplo anterior o valor de ´valorcookie1´
 *
 * @prototype   erase
 * @param       {String} nome do cookie
 * @sample      cookies.erase('cookie1'); // apaga o ´cookie1´
 */

var cookies = {
    create: function (name, value, days) {
        var expires = "";

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }

        document.cookie = name + "=" + value + expires + "; path=/";
    },

    read: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    erase: function (name) {
        this.create(name, "", -1);
    }
};

/************************************************************/

/*
 * Limpa o array removendo valor apresentado
 *
 * @name        arrayClean
 * @param       {Array} array que deverá ser varrido
 * @param       {String} valor a ser ´removido´
 * @return      {Array} retorna um novo array
 * @sample      console.info(arrayClean(['a1','a2','a3'], 'a3')); // imprime ['a1','a2'];
 * @sample      console.info(['a1','a2','a3'].clean('a2')); // imprime ['a1','a3'];
 */

var arrayClean = function (array, deleteValue) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].toLowerCase() === deleteValue.toLowerCase()) {
            array.splice(i, 1);
            i--;
        }
    }
    return array;
};

Array.prototype.clean = function (deleteValue) {
    return arrayClean(this, deleteValue);
};


/************************************************************/

/*
 * Rewrite URL
 *
 * @name        rewriteUrl
 * @param       {String} nome do parametro
 * @param       {String} valor a ser inserido
 * @param       {Bool} concat, concatena valores de um mesmo tipo de parametro
 * @return      {String} retorna a url concatenda
 */
var rewriteUrl = function (item, val, concat) {
    var r = [];
    var done = false;

    if (location.search) {
        var allItens = location.search.slice(1).split('&');
        var index = 0;

        $.each(allItens, function (k, v) {
            var key = v.split('=')[0];
            var value = v.split('=')[1].split(',');

            if (concat && key === item && value.indexOf(val.toString()) < 0) {
                r[index] = item + '=' + value + ',' + val;
                done = true;
            }
            else if (key !== item)
                r.push(v);

            index++;
        });
    }

    if (!done) r.push(item + '=' + val);

    return location.pathname + '?' + r.join('&');
};


/************************************************************/

/*
 * Validação email válido
 *
 * @name        validaMail
 * @param       {String} email a ser validado
 * @return      {Bool} válido ou não o email
 */
var validaMail = function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


/************************************************************/

/*
 * Validação URL válida
 *
 * @name        validaURL
 * @param       {String} url a ser validada
 * @return      {Bool} válida ou não a url
 */
var validaURL = function (url) {
    var r = /^(http|https):\/\/[^ "]+$/;
    return r.test(url);
};


/************************************************************/

/*
 * Validação YOUTUBE url
 *
 * @name        validaYoutube
 * @param       {String} url a ser validada
 * @return      {String} retorna o ID do vídeo do youtube ou 'false' se não for valido
 */
var validaYoutube = function(link){
    var match = link.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
    return (match && match[7].length === 11) ? match[7] : false;
};


/************************************************************/

/*
 * Adiciona link fancybox em conteudo dinamico (ex: editor de texto)
 *
 * @name        tagNewsContent
 * @param       {Obj}
 * @param       {Obj.wrapper}   {String}    Seletor Jquery do Elemento que receberá o ajuste do fancybox
 *
 * @return      {Empty}
 * @sample      console.info(tagNewsContent({ wrapper: $('.elemento') }));
 */

var tagNewsContent = function (params) {
    var wrapper = params.wrapper || $('.news-content');

    // função adiciona link ao redor
    var exec = function (el) {
        var src = el.tagName() === 'img' ? el.attr('src') : el.find('img').attr('src');
        el.wrap('<a data-fancybox="group" href="' + src + '"></a>');
    };

    // adiciona link nas imagens sem legenda
    wrapper.find('img').each(function () {
        if ($(this).parent().tagName() !== 'figure' && $(this).parent().tagName() !== 'a')
            exec($(this));
    });

    // adiciona link nas imagens com legenda
    wrapper.find('figure').each(function () {
        if ($(this).parent().tagName() !== 'a' && !$(this).find('a').length)
            exec($(this));
    });

    // fallback admins antigos (conteudos ainda existentes)
    wrapper.find('.lightbox').attr('data-fancybox', 'group');
};

// função para recuperar tag name
$.fn.tagName = function () {
    return this.prop("tagName").toLowerCase();
};