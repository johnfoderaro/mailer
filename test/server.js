const assert = require('assert');
const http = require('http');

const server = require('./../lib/server');

describe('server', () => {
  it('should return an instance of the http.Server object', () => {
    const mailer = server({
      port: 3000,
      endPoint: '/submit/',
      honeypot: 'topic',
      input: ['name', 'email', 'comment'],
      message: {
        success: '',
        fail: '',
      },
      mailer: {
        aliases: ['Me', 'Mac'],
        domains: ['me.com', 'mac.com'],
        host: 'smtp.mail.me.com',
        port: 587,
        auth: {
          user: 'config.icloud',
          pass: 'config.password',
        },
      },
    });
    assert.ok(mailer instanceof http.Server);
  });
});

