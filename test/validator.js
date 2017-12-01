const assert = require('assert');

const validator = require('./../lib/validator');

describe('validator', () => {
  const options = {
    port: 3000,
    endPoint: '/submit/',
    honeypot: 'topic',
    input: ['name', 'topic', 'email', 'comment'],
    message: {
      success: 'Success! I will be in touch soon.',
      fail: 'Oh no! Something went wrong. Try again later.',
    },
  };
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
        assert.throws(() => {
          if (validator(options, request, data) instanceof Error) {
            throw new Error();
          }
        }, Error);
      });
    }
    thrower(inputData);
  });
});
