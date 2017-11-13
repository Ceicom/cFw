# CModal

draft documentation

### img

* _data-modal-url_ é opcional
* _href_ pode ser substituido por _data-modal-img_, 1 dos 2 é obrigatório para imagem
* _data-modal_ é parametro obrigatório (vazio)

Método 1:
```
<a href="link imagem" class="wrapper-cmodal" data-modal data-modal-url="ceicom.com.br"></div>
```
Método 2:
```
<div class="wrapper-cmodal" data-modal data-modal-img="link imagem" data-modal-url="ceicom.com.br"></div>
```

---

### botão

* _data-modal_ recebe identificador do conteudo, pode ser id _#id_ (# = opcional) ou classe _.classe_, é parametro obrigatório
* _data-modal-class_ classe que será aplicada no parent/wrapper do modal, utilizada geralmente para alterar visual do modal, é opcional
* _data-modal-width_ largura máxima do modal, é opcional
* _data-modal-lock_ desativa rolagem da tela (padrão = true, se passado false libera rolagem tela), é opcional

```
<div class="wrapper-cmodal" data-modal=".cfw-modal__conteudo" data-modal-class="classe modal" data-modal-width="300" data-modal-lock="false"></div>
```

---

### html

* tipo img não precisa de html
* elemento base, recomenda-se trazer o elemento oculto (hidden)

```
<div id="conteudo" class="cfw-modal__conteudo" hidden>
   <a href="#">asdasdasd</a>
   Popup
</div>
```

---

### js

Fechar o modal

```
j('.cfw-modal:visible').trigger('close');
```
