const url = require('url');

function validator(options, request) {
  const { input, honeypot } = options;
  const { method, body } = request;
  const data = JSON.parse(body);
  const post = method === 'POST';
  const path = url.parse(request.url).pathname === options.endPoint;
  const values = input.filter((item) => {
    const hasHoneypot = data[honeypot] === '' && item === honeypot;
    const hasValue = (!hasHoneypot && data[item] && data[item].length > 0) || false;
    const valid = (hasHoneypot && !hasValue) || (!hasHoneypot && hasValue && item !== honeypot);
    return valid;
  });
  const valid = values.length === input.length;
  if (post && path && valid) return true;
  return false;
}

module.exports = validator;
