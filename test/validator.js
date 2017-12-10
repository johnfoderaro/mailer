const assert = require('assert');

const validator = require('./../lib/validator');
const options = require('./options');

describe('validator', () => {
  it('should return true if input array fields match body properties', () => {
    const data = {
      name: '<html>true</html>',
      topic: '',
      email: 'test',
      comment: 'test',
    };
    const request = {
      method: 'POST',
      url: '/submit/',
    };
    assert.ok(validator(options, request, data));
  });
  it('should return false if input array fields do not match body properties', () => {
    const inputData = [{
      data: {
        name: '<html>true</html>',
        topic: '',
        email: '',
        comment: 'test',
      },
      request: {
        method: 'POST',
        url: '/submit/',
      },
    }, {
      data: {
        name: '<html>true</html>',
        randomInputField: '12345',
        email: 'test',
        comment: 'test',
      },
      request: {
        method: 'POST',
        url: '/wrong-end-point/',
      },
    }];
    function thrower(array) {
      array.forEach((item) => {
        const { request, data } = item;
        assert.throws(() => validator(options, request, data), Error);
      });
    }
    thrower(inputData);
  });
});
