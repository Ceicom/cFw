# Formulários

Existem várias funções para validação de formulários.

- debugando ajax

```
seurl.com.br?debug=true
```

### Usando no boilerplate

* Após criar seu arquivo, insira dentro do `asp:Content` referente ao `<head>` a seguinte Meta Tag:

```
<asp:Content ID="head" ContentPlaceHolderID="head" Runat="Server">
    <meta id="jsPageID" data-value="cfw"/>
</asp:Content>
```

**obs:** você pode iniciar vários módulos, separado-os por vírgula;

```
<meta id="jsPageID" data-value="modulo1,modulo2,modulo3"/>
```

Ou, em seu arquivo JS, relativo a página:

```
define([
    'cfw'
],function(){
    //chame qual plugin desejar
});
```

### Usando em um projeto separado

* Instancie o script do **cFw** na página, antes de fechar o `</body>` com o seguinte código:

```
<script src="http://src.inf.br/cfw/cfw.min.js"></script>
```

### citystate

- [documentação](https://github.com/Ceicom/cFw/tree/master/dev/js/config/citystate)

---

### mask

- [documentação](https://github.com/Ceicom/cFw/tree/master/dev/js/config/mask)

---


### zipCode

- [documentação](https://github.com/Ceicom/cFw/tree/master/dev/js/config/zipcode)

---

### submitForm

- [documentação](https://github.com/Ceicom/cFw/tree/master/dev/js/config/submitform)

---

### validateForm

- [documentação](https://github.com/Ceicom/cFw/tree/master/dev/js/config/validateform)
---

### validateFormData

- [documentação](https://github.com/Ceicom/cFw/tree/master/dev/js/config/validateformdata)
