'use strict';

function replace(txt, entities, wrapper) {
  return ([].concat(entities)).sort((a, b) => {
    return a.position.begin - b.position.begin
  }).reduce((acc, item) => {
    const wrap = wrapper(item);
    const begin = acc.delta + item.position.begin;
    const end = acc.delta + item.position.end;
    //console.log("\ndelta: "+acc.delta+", begin: "+begin+", end: "+end+", len: "+wrap.length);
    acc.buffer = acc.buffer.slice(0, begin) + wrap + acc.buffer.slice(end);
    //console.log("buffer: "+acc.buffer);
    acc.delta = acc.delta + wrap.length - item.position.ngram.length;
    //console.log("new delta: "+acc.delta);
    return acc;
  }, {
    buffer: txt,
    delta: 0
  }).buffer;
}

module.exports = replace
