const assert = require('assert');
const fs = require('fs');
const http = require('http');

const post = require('./post');
const server = require('./../lib/server');

const options = require('./options');

describe('server', () => {
  it('should return an instance of the http.Server object', () => {
    /**
     * we assign the server function to a constant
     * in order to gain access to the http.Server instance
     * so we can close it after each test to keep the port available
     * for future tests.
     */
    const mailer = server(options, () => {});
    assert.ok(mailer instanceof http.Server);
    mailer.close();
  });
  it('should execute a callback function and contain a valid response', (done) => {
    const mock = JSON.parse(fs.readFileSync('./test/valid-mock.json'));
    const mailer = server(options, (response) => {
      const { data } = response;
      mailer.close();
      assert.ok(data);
      done();
    });
    post({ mock, port: 3001, path: '/submit/' });
  });
  it('should execute a callback function and contain a valid response', (done) => {
    const mock = JSON.parse(fs.readFileSync('./test/invalid-mock.json'));
    const mailer = server(options, (response) => {
      const { error } = response;
      mailer.close();
      assert.throws(() => {
        if (error instanceof Error) {
          throw new Error(error);
        }
      });
      done();
    });
    post({ mock, port: 3001, path: '/submit/' });
  });
});

