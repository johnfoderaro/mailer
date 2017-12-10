const assert = require('assert');

const mailer = require('./../lib/mailer');

const keys = require('./../keys');

const { user, pass, email } = keys;

const options = {
  mail: {
    // TODO option for text or html
    to: email,
    from: email,
    subject: 'New Form Submission',
    aliases: ['Me', 'Mac'],
    domains: ['me.com', 'mac.com'],
    host: 'smtp.mail.me.com',
    port: 587,
    secure: false,
    auth: { user, pass },
  },
  server: {
    port: 3001,
    endPoint: '/submit/',
    honeypot: 'topic',
    fields: ['topic', 'name', 'email', 'comment'],
    message: {
      success: '',
      fail: '',
    },
  },
};

describe('mailer', () => {
  it('should log stuff to console', () => {
    mailer(options, () => {
      assert.ok(false);
    });
  });
});
