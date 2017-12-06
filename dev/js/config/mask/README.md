# jQuery Mask Plugin

> Documentação Oficial [jQuery Mask](https://github.com/igorescobar/jQuery-Mask-Plugin)

* iniciando com **Javascript**

```
cfw.mask.init();
```

- Ao inicializar conforme modelo acima é obrigatório o uso dos atributos do html5 `data` para indicar qual mascara será aplicada em cada elemento
- Opcional você pode inicializar o plugin especifico para um elemento, ex:

```
cfw.mask.init(
  {
      element: $('.element'),
      mask: '00.000.000/0000-00',
      options: {
          reverse: true,
          selectOnFocus: true
      }
  }
);
```

- sendo possivel repassar todas todos os options da documentação oficinal nesta inicialização, no exemplo foram repassadas:
  - **element** : Elemento a ser aplicado a máscara, $('.elemento') (obrigatório);
  - **mask** [string] :  com o modelo de máscara ( ex: '00.000.000/0000-00' );
  - **reverse** [bool] :  Preenchimento da máscara da direita para esquerda
  - **selectOnFocus** [bool] : Seleciona todo o valor do campo ao dar o focus

- Existem alguns aliases para as as máscaras:
- **Data (mascara dd/mm/aaaa)**
 
```
<input type="text" data-mask="dd/mm/aaaa"/>
```

- **CEP (mascara 00000-000)**

```
<input type="text" data-mask="00000-000"/>
```

- **Dinheiro (mascara 0.000,00 sem limite de caracteres (max-lenght))**

```
<input type="text" data-mask="0.000,00"/>
```

- **CNPJ (mascara 00.000.000/0000-00)**

```
<input type="text" data-mask="00.000.000/0000-00"/>
```

- **CPF (mascara 000.000.000-00)**

```
<input type="text" data-mask="000.000.000-00"/>
```

- **Telefone (mascara (00) 00000-0000)**

```
<input type="text" data-mask="(00) 00000-0000"/>
```

- **Hora (mascara hh:mm:ss)**

```
<input type="text" data-mask="hh:mm:ss"/>
```