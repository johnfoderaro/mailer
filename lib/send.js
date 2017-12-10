const nodemailer = require('nodemailer');

function body(data, honeypot, input) {
  return input
    .filter(field => field !== honeypot)
    .map(field => `<h2>${field}</h2>\n<p>${data[field]}</p>`)
    .join(' ');
}

function send(options, data, callback) {
  const { server, mail } = options;
  const transporter = nodemailer.createTransport({
    host: mail.host,
    port: mail.port,
    secure: mail.secure,
    auth: mail.auth,
  });
  const mailOptions = {
    from: mail.from,
    to: mail.to,
    subject: mail.subject,
    html: body(data, server.honeypot, server.fields),
    // TODO possible option for different email formats: text/html
  };
  transporter.sendMail(mailOptions, (error, info) => callback({ error, info }));
}

module.exports = send;
