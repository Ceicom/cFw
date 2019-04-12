# Facebook

---

Captura as publicações do Facebook com base nos campos passados na propriedade fields

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
### Passos para a geração do TOKEN do Facebook e Instagram

Se prepare psicologicamente pois o processo é grande e chato (extremamente burocratico)

- Primeiro precisara ter acesso a conta do cliente

- Será necessário criar um APP no https://developers.facebook.com

- Permissões:
    - manage_pages
    - intagram_basic (caso vá exibir publicações do instagram)
    - Page Public Content Access

- Vai precisar explicar onde você vai usar o APP do facebook e como o usuário vai interagir com ele
- Téra que gravar um screencast (isso mesmo, vai te que gravar um video pra esses otários aprovarem seu APP), 
  caso você precise das permissões do instagram, terá que fazer essa verificação antes mesmo de testar ou desenvolver a aplicação (é triste eu sei)
  caso precise também, tem um exemplo nesse link https://developers.facebook.com/docs/instagram-api/getting-started

**Observações:**

- O Instagram deve ser vinculado com a página do facebook do cliente
- Caso ainda esteja em beta o Explorador do Graph API use a versão classica pois esta outra está bugada
- Desative qualquer tipo de bloqueio de conteudo e ADS
- Todos os passos da verificação do facebook devem ser feitos se não o mesmo não libera a verificação
- Para outras configurações e opções dos campos e tudo mais, consulte a [documentação](https://developers.facebook.com/docs/graph-api/)