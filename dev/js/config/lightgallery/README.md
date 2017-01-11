# lightGallery

> Documentação original do [lightGallery](https://github.com/sachinchoolur/lightGallery)
  
### Usando no boilerplate

* Após criar seu arquivo, insira dentro do `asp:Content` referente ao `<head>` a seguinte Meta Tag:

```
<asp:Content ID="head" ContentPlaceHolderID="head" Runat="Server">
    <meta id="jsPageID" data-value="lightgallery"/>
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
<link href="http://src.inf.br/vendor/lightgallery/lightgallery.min.css" rel="stylesheet" type="text/css"/>
```

* Instancie o script do **cFw** na página, antes de fechar o `</body>` com o seguinte código:

```
<script src="http://src.inf.br/cfw/cfw.min.js"></script>
```

**Obs:** é necessário o jQuery para iniciar o cFw.

---

### Iniciando o lightGallery

- inicialização básica

```
cfw.lightgallery.init({ 
    element : '.minhaClasse'
});
```

- outras opções

```
{
    thumbnail: false,
    autoplay: false,
    fullScreen: false,
    zoom: false,
    hash: false,
    share: false
}
```

- **thumbnail** : Habilita os thumbs para a galeria;
- **autoplay** : Habilita a troca de fotos automática;
- **fullScreen** : Habilita o botão ver em tela cheia;
- **zoom** : Habilita o botão de Zoom;
- **hash** : Habilita a nevegação da galeria por hashes,
- **share** : Habilita o compatilhamento das imagens nas redes sociais,

> Documentação completa do [lightGallery](https://github.com/sachinchoolur/lightGallery)