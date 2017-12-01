const http = require('http');

const email = require('./email');
const validator = require('./validator');

function responseHelper(res, options, callback) {
  const { status, client, result } = options;
  res.writeHead(status, { 'Content-Length': Buffer.byteLength(client) }, client);
  res.end(client);
  return callback(result);
}

function server(options, callback) {
  const { port, message: { success, fail } } = options;
  return http.createServer((req, res) => {
    const buffer = [];
    req.on('data', chunk => buffer.push(chunk));
    req.on('error', (error) => {
      const status = 500;
      const result = { error, data: null };
      const client = JSON.stringify({ error: new Error(fail), data: null });
      responseHelper(res, { status, client, result }, callback);
    });
    req.on('end', () => {
      const data = JSON.parse(Buffer.concat(buffer).toString());
      try {
        validator(options, req, data);
      } catch (error) {
        const status = 500;
        const result = { error, data: null };
        const client = JSON.stringify({ error: new Error(fail), data: null });
        responseHelper(res, { status, client, result }, callback);
      }
      const status = 200;
      const result = { error: null, data };
      const client = JSON.stringify({ error: null, data: success });
      // TODO send the email!
      responseHelper(res, { status, client, result }, callback);
      email(options, data, callback);
    });
  }).listen(port, () => console.log(`mailer now listening on port: ${port}`));
}

module.exports = server;
