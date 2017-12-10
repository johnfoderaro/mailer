// const server = require('./server');

const valid = require('./valid');

function mailer(options, callback) {
  const validMailSettings = Object.entries(valid.mail).sort();
  const mailSettings = Object.entries(options.mail).sort();
  for (let i = 0; i < mailSettings.length; i += 1) {
    mailSettings[i]
  }
  


  // properties.reduce(i => i).forEach(pro)
  // loop through properties
  // check if each property's value is valid type
  // if anything is missing or is wrong type, throw
  // console.log(Object.getOwnPropertyNames(options));
  // return the server so the user has access to http.Server instance
  // return server(options, callback);
}

module.exports = mailer;
