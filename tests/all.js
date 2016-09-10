const chai = require('chai');
chai.use(require('chai-fuzzy'));
const expect = chai.expect;

const replace = require("../lib/replace-entities");

describe('@datagica/replace-entities', () => {

  describe('should do basic substitution', () => {

    const input = 'Vegeta, eat your vegetables!';

    const entities = [
      {
        "position": {
          "ngram": "Vegeta",
          "score": "1",
          "index": 0,
          "begin": 0,
          "end": 6
        },
        "entity": {
          "id": "vegeta",
          "label": "vegeta",
          "description": "character"
        }
      },
      {
        "position": {
          "ngram": "vegetables",
          "score": 0.8,
          "index": 3,
          "begin": 17,
          "end": 27
        },
        "entity": {
          "id": "vegetable",
          "label": "vegetable",
          "description": "edible thing"
        }
      }
    ];
    const wrapper = item => {
      return `<a href="/resource/${item.entity.label}" class="${
      (item.position.score > 0.80) ? 'good' : 'normal'
      }">${
      item.position.ngram
      }</a> <i>(${
      item.entity.description
      })</i>`
    };

    const output = replace(input, entities, wrapper);
    expect(output).to.be.like(
      `<a href="/resource/vegeta" class="good">Vegeta</a> ` +
      `<i>(character)</i>, eat your ` +
      `<a href="/resource/vegetable" class="normal">vegetables</a> ` +
      `<i>(edible thing)</i>!`
    );
    console.log("done")
  })
})
