const assert = require('assert');

const validator = require('./../lib/validator');

describe('validator', () => {
  it('should return true if input array fields match body properties', () => {
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
    const request = {
      method: 'POST',
      body: JSON.stringify({
        name: '<html>true</html>',
        topic: '',
        email: 'test',
        comment: 'test',
      }),
      url: '/submit/',
    };
    assert.ok(validator(options, request));
  });
  it('should return false if input array fields do not match body properties', () => {
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
    const request01 = {
      method: 'POST',
      body: JSON.stringify({
        name: '<html>true</html>',
        topic: '',
        email: '',
        comment: 'test',
      }),
      url: '/submit/',
    };
    const request02 = {
      method: 'POST',
      body: JSON.stringify({
        name: '<html>true</html>',
        randomInputField: '12345',
        email: 'test',
        comment: 'test',
      }),
      url: '/submit/',
    };
    assert.ok(!validator(options, request01));
    assert.ok(!validator(options, request02));
  });
});
