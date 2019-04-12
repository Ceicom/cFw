# Facebook

---

Pega as publicações do facebook

### Iniciando o Facebook

Inicia-se o plugin passando as informações de configurações necessárias para o seu funcionamento

```js
<script>
    cfw.facebook.init({
        appId: '', // obrigatório informar essa propriedade
        pageId: '', // obrigatório informar essa propriedade
        access_token: '', // obrigatório informar essa propriedade
        fields: 'full_picture,message,permalink_url,type', // default
        wrapper: 'body', // default
        limit: 12, // default
        template: '<div><img src="[full_picture]"><br>' +
                '<p>[message]</p><br>' +
                '<a href="[permalink_url]" target="_blank">Ver Mais</a></div>' // default
    });
</script>
```

--- 
**obs:** para outras configurações e opções dos campos e tudo mais, consulte a [documentação](https://developers.facebook.com/docs/graph-api/).