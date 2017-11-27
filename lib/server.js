const http = require('http');

const validator = require('./validator');

function server(options, callback) {
  const { port, message: { success, fail } } = options;
  const writeHead = (res, status, content) => res.writeHead(status, {
    'Content-Length': Buffer.byteLength(content),
  }, content);
  return http.createServer((req, res) => {
    const buffer = [];
    req.on('data', chunk => buffer.push(chunk));
    req.on('error', (error) => {
      const clientResponse = JSON.stringify({ error: new Error(fail), data: null });
      writeHead(res, 500, clientResponse);
      res.end(clientResponse);
      return callback({ error, data: null });
    });
    req.on('end', () => {
      const data = JSON.parse(Buffer.concat(buffer).toString());
      const valid = validator(options, req, data);
      console.log(data);
      if (valid) {
        const clientResponse = JSON.stringify({ error: null, data: success });
        writeHead(res, 200, clientResponse);
        res.end(clientResponse);
        return callback({ error: null, data });
      }
      const clientResponse = JSON.stringify({ error: new Error(fail), data: null });      
      writeHead(res, 500, clientResponse);
      res.end(clientResponse);
      return callback({ error: new Error('Invalid request.'), data: null });
    });
  }).listen(port, () => console.log(`mailer now listening on port: ${port}`));
}

module.exports = server;
