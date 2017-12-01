const http = require('http');

function post(options) {
  const { mock, port, path } = options;
  const request = http.request({
    port,
    path,
    method: 'POST',
    host: '127.0.0.1',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(mock)),
    },
  });
  request.on('error', error => console.error(error));
  request.write(JSON.stringify(mock));
  request.end();
}

module.exports = post;

