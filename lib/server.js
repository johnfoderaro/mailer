const http = require('http');

function server(options) {
  const { port, endPoint, message } = options;
  return http.createServer((req, res) => {
    
  }).listen(port, () => console.log());
}

module.exports = server;
