### zipCode

Auto preenchimento das informações de endereço baseado no CEP.

* elemento referência do CEP:

```
<input type="text" data-zipcode="zip"/>
```

- Para rodar o autocep em inputs com valores pré-definidos antes da inicialização do plugin é necessário utilizar o parâmetro `data-zipcode-init`

```
<input type="text" data-zipcode="zip" value="85604000" data-zipcode-init/>
```

**atributos adicionais**

- Grupo de elementos para Autopreenchimento: `data-zipcode-group`

```
<input type="text" data-zipcode="zip" data-zipcode-group="1"/>
```

- Autopreencher o **Endereço** baseado no CEP `data-zipcode="street"`

```
<input type="text" data-zipcode="street" data-zipcode-group="1" />
```

- Autopreencher o **Bairro** baseado no CEP `data-zipcode="district"`

```
<input type="text" data-zipcode="district" data-zipcode-group="1" />
```

- Autopreencher o **Estado** baseado no CEP `data-zipcode="state"`.
- O Estado pode ser preenchido em um input text ou em um select com o plugin **citystate** inicializado

```
<select data-zipcode="state" data-zipcode-group="1">
    <option>carregando...</option>
</select>
```

- Autopreencher o **Cidade** baseado no CEP `data-zipcode="city"`
- A cidade pode ser preenchida em um input text ou em um select com o plugin **citystate** inicializado

```
<select data-zipcode="city" data-zipcode-group="1">
    <option>carregando...</option>
</select>
```
