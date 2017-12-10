const assert = require('assert');

const send = require('./../lib/send');
const options = require('./options');
const data = require('./data');

describe('send', () => {
  it('should execute a callback and return a valid response', () => {
    send(options, data, response => assert.ok(response.info));
  });
});
