# owlCarousel

> Documentação original do [owlCarousel](https://owlcarousel2.github.io/OwlCarousel2/docs/started-welcome.html)
  
### Usando no boilerplate

* Após criar seu arquivo, insira dentro do `asp:Content` referente ao `<head>` a seguinte Meta Tag:

```
<asp:Content ID="head" ContentPlaceHolderID="head" Runat="Server">
    <meta id="jsPageID" data-value="owlcarousel"/>
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

### Iniciando o owlCarousel

```
cfw.owlcarousel.init({ 
    element : '.minhaClasse' 
});
```

```
<div class="minhaClasse">
  <div> Your Content </div>
  <div> Your Content </div>
</div>
```

- **algumas opções**

```
{
    items : 3,
    loop : false,
    nav : false,
    slideBy : false,
    dots : false,
    autoplay : false,
    autoplayTimeout : 4000
}
```

- **items** [int] : quantidade de itens visiveis
- **loop** [bool] : habilita o loop
- **nav** [bool] : habilita os botões, PREV / NEXT
- **slideBy** [bool] : quantidade de slides para passar por vez
- **dots** [bool] : habilita a navegação por itens
- **autoplay** [bool] : habilita o play automático ao iniciar
- **autoplayTimeout** [int] : intervalo para troca de slide ( ms )

> Documentação original do [owlCarousel](https://owlcarousel2.github.io/OwlCarousel2/docs/started-welcome.html)

> veja todas as [opções disponíveis](https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html)

> veja todos os [eventos disponíveis](https://owlcarousel2.github.io/OwlCarousel2/docs/api-events.html)