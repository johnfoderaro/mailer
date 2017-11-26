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
    const data01 = {
      name: '<html>true</html>',
      topic: '',
      email: '',
      comment: 'test',
    };
    const data02 = {
      name: '<html>true</html>',
      randomInputField: '12345',
      email: 'test',
      comment: 'test',
    };
    const request01 = {
      method: 'POST',
      url: '/submit/',
    };
    const request02 = {
      method: 'POST',
      url: '/submit/',
    };
    assert.ok(!validator(options, request01, data01));
    assert.ok(!validator(options, request02, data02));
  });
});
