const url = require('url');

function validator(options, request, data) {
  const { server: { fields, honeypot, endPoint } } = options;
  const { method } = request;
  const post = method === 'POST';
  const path = url.parse(request.url).pathname === endPoint;
  const values = fields.filter((field) => {
    const hasHoneypot = data[honeypot] === '' && field === honeypot;
    const hasValue = (!hasHoneypot && data[field] && data[field].length > 0) || false;
    return (hasHoneypot && !hasValue) || (!hasHoneypot && hasValue && field !== honeypot);
  });
  const valid = values.length === fields.length;
  if (post && path && valid) {
    return true;
  }
  
  throw new Error('Invalid request.');
}

module.exports = validator;
