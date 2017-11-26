const assert = require('assert');
const fs = require('fs');
const http = require('http');

const server = require('./../lib/server');
const post = require('./post');

describe('server', () => {
  it('should return an instance of the http.Server object', () => {
    const data = JSON.parse(fs.readFileSync('./test/valid-mock.json'));
    post({ data, port: 3001, endPoint: '/build/' });
    const mailer = server({
      port: 3000,
      endPoint: '/submit/',
      honeypot: 'topic',
      input: ['topic', 'name', 'email', 'comment'],
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

