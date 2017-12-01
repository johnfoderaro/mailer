const nodemailer = require('nodemailer');

function body(data, honeypot, input) {
  let string = '';
  input.forEach((field) => {
    if (field !== honeypot) {
      string += `
      <h2>${field}<h2>
      <p>${data[field]}</p>
    `;
    }
  });
  return string;
}

function email(options, data, callback) {
  const { honeypot, input, mailer } = options;
  const transporter = nodemailer.createTransport({
    host: mailer.host,
    port: mailer.port,
    secure: mailer.secure,
    auth: mailer.auth,
  });
  const mailOptions = {
    from: mailer.from,
    to: mailer.to,
    subject: mailer.subject,
    html: body(data, honeypot, input),
    // FIXME check for text/html, append data accordingly
    // text: 'Hello world?', // plain text body
    // html: '<b>Hello world?</b>' // html body
  };
  transporter.sendMail(mailOptions, (error, info) => callback({ error, info }));
}

module.exports = email;
