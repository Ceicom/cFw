# MatchHeight

> Documentação original do [MatchHeight](https://github.com/liabru/jquery-match-height)
  
### Usando no boilerplate

* Após criar seu arquivo, insira dentro do `asp:Content` referente ao `<head>` a seguinte Meta Tag:

```
<asp:Content ID="head" ContentPlaceHolderID="head" Runat="Server">
    <meta id="jsPageID" data-value="matchheight"/>
</asp:Content>
```

**obs:** você pode passar vários módulos separados por vírgula;

```
<meta id="jsPageID" data-value="modulo1,modulo2,modulo3"/>
```

### Usando em um projeto separado


* Primeiro, devemos instanciar o script do **cFw** na página, antes de fechar o `</body>` com o seguinte código:

```
<script src="http://src.inf.br/cfw/cfw.min.js"></script>
```

**Obs:** é necessário o jQuery para iniciar o cFw.

---

### Iniciando o MatchHeight

Existe duas formas de iniciá-lo:

* passando uma classe para alinhar os elementos:

```
<script>
    cfw.matchheight.init({ element: '.minhaClasse' });
</script>
```

* ou iniciá-lo pelo atributo `data-mh`, que pode ter um valor diferente para cada grupo que deseja alinhar:

```
<div data-mh> Lorem ipsum dolor sit amet </div>
```

ou também:

```
<div data-mh="grupo1"> Lorem ipsum dolor sit amet </div>
```

#### Opções padrão

```
{
    byRow: true,
    property: 'height',
    target: null,
    remove: false
}
```

- **byRow** : habilita alinhamento por linha
- **property** : qual propriedade do CSS deve mudar (ex: 'height' ou 'min-height')
- **element** : passa uma `classe` para alinhar os elementos
- **remove** : remove valores anterires