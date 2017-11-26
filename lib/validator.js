const url = require('url');

function validator(options, request) {
  const { input, honeypot } = options;
  const { method, body } = request;
  const data = JSON.parse(body);
  const post = method === 'POST';
  console.log(data[honeypot]);
  const path = url.parse(request.url).pathname === options.endPoint;
  const values = input.filter((item) => {
    const hasVal = (data[item] && data[item].length > 0) || false;
    const hasHoneyPot = (data[honeypot] && data[honeypot].length === 0) || false;
    const valMatch = hasVal && hasVal !== hasHoneyPot;


    const match = hasVal && hasVal !== hasHoneyPot && data[item].length > 0;
    return match || data[honeypot].length === 0;
  });
  const valid = values.length === input.length;
  if (post && path && valid) return true;
  return false;
}

module.exports = validator;
