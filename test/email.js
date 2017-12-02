const assert = require('assert');

const send = require('./../lib/send');
const keys = require('./../keys');

const { user, pass, email } = keys;

const options = {
  port: 3001,
  endPoint: '/submit/',
  honeypot: 'topic',
  // TODO rename input to content? fields?
  input: ['topic', 'name', 'email', 'comment'],
  message: {
    success: '',
    fail: '',
  },
  mailer: {
    // TODO option for text or html
    to: email,
    from: email,
    subject: 'New Form Submission',
    aliases: ['Me', 'Mac'],
    domains: ['me.com', 'mac.com'],
    host: '',
    port: 587,
    secure: false,
    auth: { user, pass },
  },
};

describe('send', () => {
  it('should execute a callback', () => {
    assert.ok(false);
  });
});
