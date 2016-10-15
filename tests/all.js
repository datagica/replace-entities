const chai = require('chai');
chai.use(require('chai-fuzzy'));
const expect = chai.expect;

const replace = require("../lib/replace-entities");

describe('@datagica/replace-entities', () => {

  describe('should replace entities in a damaged text', () => {

    const entities = [{
      "position": {
        "score": 1,
        "index": 1,
        "end": 60,
        "ngram": "abcedfghij",
        "begin": 50
      }
    }, {
      "position": {
        "score": 1,
        "index": 2,
        "end": 110,
        "ngram": "klmnopqrst",
        "begin": 100
      }
    }];

    // split into random sentences
    const sentences = [
      `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum abcedfghij lorem ipsum `,
      `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum klmno`,
      `pqrst lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum `,
      `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum`
    ];


    const sequence = replace({
      entities: entities,
      content: sentences
    });

    expect(sequence).to.be.like([
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      "\n", {
        "position": {
          "score": 1,
          "index": 1,
          "end": 60,
          "ngram": "abcedfghij",
          "begin": 50
        }
      },
      " lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
      "\n", {
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
    ])

    const transformer = (item) => (
      item === '\n' ?
      '<br/>' :
      typeof item === 'string' ?
      item :
      `<a href="/resource/${item.position.ngram}" ` +
      `class="${(item.position.score > 0.80) ? 'good' : 'normal'}"` +
      `>${item.position.ngram}</a>`
    )

    const output = sequence.map(x => transformer(x)).join('')

    expect(output).to.be.like(
      `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ` +
      `ipsum <br/><a href="/resource/abcedfghij" class="good">abcedfghij</a> lorem ` +
      `ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ` +
      `ipsum <br/><a href="/resource/klmnopqrst" class="good">klmnopqrst</a> lorem ` +
      `ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ` +
      `lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum<br/>`
    );
    console.log("done")
  })

})
