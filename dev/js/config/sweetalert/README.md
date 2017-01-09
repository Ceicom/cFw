# SweetAlert

Um jeito diferente de apresentar 'alert()'
> Documentação original do [SweetAlert](https://github.com/t4t5/sweetalert)

### Usando no boilerplate


* Após criar seu arquivo, insira dentro do `asp:Content` referente ao `<head>` a seguinte Meta Tag:

```
<asp:Content ID="head" ContentPlaceHolderID="head" Runat="Server">
    <meta id="jsPageID" data-value="sweetalert"/>
</asp:Content>
```

**obs:** você pode passar vários módulos separados por vírgula;

**obs:** o CSS do plugin é carregado automaticamente;


```
<meta id="jsPageID" data-value="modulo1,modulo2,modulo3"/>
```

### Usando em um projeto separado

* Carregar o **CSS** do plugin, insira o código abaixo antes de fechar o `</head>`:

```
<link href="http://src.inf.br/vendor/sweetalert/sweetalert.min.css" rel="stylesheet" type="text/css"/>
```

* Instancie o script do **cFw** na página, antes de fechar o `</body>` com o seguinte código:

```
<script src="http://src.inf.br/cfw/cfw.min.js"></script>
```


### Iniciando o SweetAlert

Inicia-se o plugin normalmente

```
<script>
    cfw.sweetalert.init();
</script>
```

- Alerta básico

```
swal("Hello World!")
```

- Mensagem + Frase em baixo

```
swal("Hello World!", "Massa, não é?")
```

- Mensagem de [Sucesso]

```
swal("Parabéns!", "Alguma coisa deu certo!", "success")
```

--- 
**obs:** para outras configurações e opções, consulte a [documentação](https://github.com/t4t5/sweetalert).