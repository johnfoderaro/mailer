const http = require('http');

function post(options) {
  const { data } = options;
  const request = http.request({
    port: options.port,
    path: options.path,
    method: 'POST',
    host: '127.0.0.1',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(data)),
    },
  });
  request.on('error', error => console.error(error));
  request.write(JSON.stringify(data));
  request.end();
}

module.exports = post;

