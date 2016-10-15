Replace entities

## Installation

    $ npm install @datagica/replace-entities --save

## Usage

Given some text:

```javascript
const content = [
  `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum abcedfghij lorem ipsum `,
  `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum klmno`,
  `pqrst lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum `,
  `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum`
]
```

And entities:

```javascript
const entities = [
  {
    "data": "foo",
    "position": {
      "score": 1,
      "index": 1,
      "end": 60,
      "ngram": "abcedfghij",
      "begin": 50
    }
  },
  {
    "data": "bar",
    "position": {
      "score": 1,
      "index": 2,
      "end": 110,
      "ngram": "klmnopqrst",
      "begin": 100
    }
  }
]
```

`@datagica/replace-entities` will transform the output into a sequence of tokens:

```javascript
const sequence = replace({
  entities: entities,
  content: content
});
```

into the following sequence:

```javascript
[
  "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
  "\n",
  {
    "data": "foo",
    "position": {
      "score": 1,
      "index": 1,
      "end": 60,
      "ngram": "abcedfghij",
      "begin": 50
    }
  },
  " lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
  "\n",
  {
    "data": "bar",
    "position": {
      "score": 1,
      "index": 2,
      "end": 110,
      "ngram": "klmnopqrst",
      "begin": 100
    }
  },
  " lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  "\n"
]
```

which is then easy to convert to HTML:

```javascript
sequence.map(x => (
  item === '\n'            ? '<br/>'
  typeof item === 'string' ? item
                           :
    `<a `+
      `href="/some/api/${item.position.ngram}" ` +
      `class="some-stuff-${item.data}"` +
      `>${item.position.ngram}`+
    `</a>`
)).join('')
```

or JSX!

```javascript
<MyReactComponent>
  {sequence.map(x => (
    item === '\n'            ? <br/>
    typeof item === 'string' ? <span>{item}</span>
                             : <a href="#">{item.data}</a>
  ))}
</MyReactComponent>
```
