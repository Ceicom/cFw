# Analytics

### Usando no boilerplate

Por padrão, o script do _Google Analytics_ já é carregado automaticamente, basta iniciá-lo passando o [Código de acompanhamento](https://support.google.com/analytics/answer/1008080?hl=pt-BR), dentro do arquivo de [configurações do Analytics](https://github.com/Ceicom/html_boilerplate/blob/master/dev/js/components/analytics.js).

```
cfw.analytics.init('UA-XXXX-XX');
```


### Usando em um projeto separado

* Primeiro, devemos instanciar o script do **cFw** na página, antes de fechar o `</body>` com o seguinte código:

```
<script src="http://src.inf.br/cfw/cfw.min.js"></script>
```

* Iniciar o Analytics passando o passando o [Código de acompanhamento](https://support.google.com/analytics/answer/1008080?hl=pt-BR)

```
cfw.analytics.init('UA-XXXX-XX');
```

**Obs1:** é necessário o jQuery para iniciar o cFw.

**Obs2:** utilizando a versão antiga do analytics sem o tagmanager.