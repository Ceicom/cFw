# Funções Extras

Algumas funções globais que são úteis

### capitalizeStr

 Altera apresentação do texto deixando somente a primeira letra maiúscula

```
capitalize('boa ventura de são roque');       
//Boa ventura de são roque
```

```
capitalize('boa ventura de são roque', true)
//Boa Ventura de São Roque
```

---

### clearString

 * Substitui os caracteres com acentos pela respectivo caractere
 * Troca demais caracteres especiais por hifen
 * Remove pontos

```
clearString('ação.c|c.é')
//acaoc-ce
```

---

### cookies

Manipula Cookies do navegador

**criando um cookie**

```
cookies.create('cookie1', 'valorcookie1', 2)
```
cria um cookie com o nome de ´cookie1´, com o valor de ´valorcookie1´ valido por ´2´ dias

**obtendo valor de um cookie**

```
cookies.read('cookie1');
//valorcookie1;
```

**apagando um cookie**
```
cookies.erase('cookie1');
```

---

### dealData

Trata a uma string contendo uma data, retornando-a em um objeto:

```
var myDate = dealData('16/12/2016 14:12:00');
```
retorno:
```
{
    day         // nº dia -> 16
    month       // nº mês -> 12
    year        // nº ano -> 2016
    monthAbr    // nome abreviado mês (3 caracteres) -> dez
    monthExt    // nome por extenso do mês -> dezembro
    fullHour    // horario completo -> 14:12:00
    hour        // nº hora -> 14
    minute      // nº minuto -> 12
    second      // nº segundos -> 00
}
```

**retorna o mês por extenso**
```
console.info( myDate.monthExt );
//dezembro
```

**retorna o mês abreviado**
```
console.info( myDate.monthAbr );
//dez
```

**retorna o mês em numeral**
```
console.info( myDate.month );
//12
```

**retorna o dia**
```
console.info( myDate.day );
//16
```

**retorna a hora completa**
```
console.info( myDate.fullHour );
//14:12:00
```

**retorna a hora**
```
console.info( myDate.hour );
//14
```

**retorna a minuto**
```
console.info( myDate.minute );
//12
```

**retorna a segundo**
```
console.info( myDate.second );
//00
```

---

### getUrlParameter

Captura parametro passado via GET na URL

**url:** `http://test.com/noticias?id=4`

```
getUrlParameter('id');
//4
```

---

### wSize

Retorna a largura (width) ou altura (height) da janela.

**retornando a largura**
 
```
console.info( wSize('w') );
//ex: 1920
```

**retornando a altura**

```
console.info( wSize('h') );
//ex: 1080
```
