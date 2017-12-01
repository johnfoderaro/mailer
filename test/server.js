const assert = require('assert');
const fs = require('fs');
const http = require('http');

const server = require('./../lib/server');
const post = require('./post');

describe('server', () => {
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
      to: '',
      from: '',
      subject: '',
      aliases: ['Me', 'Mac'],
      domains: ['me.com', 'mac.com'],
      host: '',
      port: 587,
      secure: false,
      auth: {
        user: 'config.icloud',
        pass: 'config.password',
      },
    },
  };
  it('should return an instance of the http.Server object', () => {
    const mock = JSON.parse(fs.readFileSync('./test/valid-mock.json'));
    post({ mock, port: 3001, path: '/submit/' });
    const mailer = server(options, () => {
      assert.ok(mailer instanceof http.Server);
      mailer.close();
    });
  });
  it('should return an instance of the http.Server object', () => {
    const mock = JSON.parse(fs.readFileSync('./test/valid-mock.json'));
    post({ mock, port: 3001, path: '/submit/' });
    const mailer = server(options, () => {
      assert.ok(mailer instanceof http.Server);
      mailer.close();
    });
  });
});

