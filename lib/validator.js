const url = require('url');

function validator(options, request, data) {
  const { input, honeypot } = options;
  const { method } = request;
  const post = method === 'POST';
  const path = url.parse(request.url).pathname === options.endPoint;
  const values = input.filter((item) => {
    const hasHoneypot = data[honeypot] === '' && item === honeypot;
    const hasValue = (!hasHoneypot && data[item] && data[item].length > 0) || false;
    return (hasHoneypot && !hasValue) || (!hasHoneypot && hasValue && item !== honeypot);
  });
  const valid = values.length === input.length;
  return post && path && valid ? true : new Error('Invalid request.');
}

module.exports = validator;
