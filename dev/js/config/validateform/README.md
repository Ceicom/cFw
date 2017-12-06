### validateForm

O atributo **data-validate**, torna um elemento obrigatório para validação. Este atributo por sí só, já faz o elemento ser obrigatório.

- validar um campo, mas não torná-lo obrigatório, use o atributo `data-validate-optional`;

```
<input type="qualquer" data-validate-optional="true"/>
```

- posicionar o tooltip no wrapper do elemento;
```
<div class="col6">
    <label>
        <input data-validate-target="div"/>
    </label>
</div> 
```

- validar um `<form>`;

```
<form data-validate="form"></form>
````

- validar um campo do tipo **nome**;

```
<input type="text" data-validate="fullname"/>
````

- validar um campo do tipo **email**;

```
<input type="email" data-validate="email"/>
````

- validar um campo do tipo **cpf**;

```
<input type="text" data-validate="cpf"/>
````

- validar um campo do tipo **cnpj**;

```
<input type="text" data-validate="cnpj"/>
````

- validar um campo do tipo **url**;

```
<input type="text" data-validate="url"/>
````

- validar um campo do tipo **file**;

  > **obs:** os atributos podem ser combinados;

  - validação básica

    ```
    <input type="text" data-validate="file"/>
    ````

  - limitar tamanho de arquivo (em bytes)
    ```
    <input type="text" data-validate="url" data-validate-size="1024"/>
    ````

  - tipo de arquivos permitidos ( separados por vírgula )
    ```
    <input type="text" data-validate="url" data-validate-ext="jpg,rar,zip"/>
    ````    

- validar itens do tipo **checkbox**;

  > **obs:** é preciso do atributo `name`;

  - validação básica

    ```
    <input type="checkbox" name="test" data-validate="checkbox"/>
    ```

  - limitar a quantidade de checkbox marcados ( min, max )
  
    ```
    <input type="checkbox" name="test" data-validate="checkbox" data-validate-qtd="2,2"/>
    <input type="checkbox" name="test"/>
    <input type="checkbox" name="test"/>
    ```

- validar itens do tipo **radio**;

  > **obs:** é preciso do atributo `name`;

  - validação básica

    ```
    <input type="radio" name="test" data-validate="radio" value="sim"/>
    <input type="radio" name="test" data-validate="radio" value="não"/>
    ```

- comparar dois campos `data-validate-group`;

```
<input type="password" data-validate-group="senha"/>
<input type="password" data-validate-group="senha"/>

<input type="email" data-validate-group="email"/>
<input type="email" data-validate-group="email"/>
````
---

### Evento validaform
```
$(document).on('cfw_validateForm_error', function (e, form, type, $el, ret) {});
```

- ```form``` = seletor do formulário que recebeu o evento
- ```type``` = tipo de validação que falhou (ex: fullname, required, etc..)
- ```$el``` = seletor do campo (input, select,etc..) que foi invalidado
- ```ret``` = retorno validação

---