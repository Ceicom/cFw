# Cidade Estado (listagem)

Inicia os elementos de Cidade/Estados em um formulário;

* iniciando os **estados** por atributos

```
<select data-list="states" data-list-group="1">
    <option>carregando...</option>
</select>
```

* iniciando os **cidades** por atributos

```
<select data-list="cities" data-list-group="1">
    <option>carregando...</option>
</select>
```

* iniciando com **Javascript**

```
cfw.citystate.init({
    filterStates: ['SC,PR,RS'],
    selectState: '#estado1',
    selectCity: '#cidade1',
    initState: 'Santa CaTaRiNa'
});
```
- opções do citystate:
  - **filterStates** : Lista somente os estados indicados;
  - **selectState** : ID ou CLASSE do elemento que receberá os Estados;
  - **selectCity** : ID ou CLASSE do elemento que receberá as Cidades;
  - **initState** : Nome do estado inicialmente selecionado ( nome por extenso ou sigla );

---

### Evento cidade

```
$(document).on('cfw_cities_loaded', function (e, $el) {});
```

### Evento estado

```
$(document).on('cfw_states_loaded', function (e, $el) {});
```

- ```$el``` = select ou elemento que recebeu o evento.

---