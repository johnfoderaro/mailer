module.exports = {
  server: {
    port: 'number',
    endPoint: 'string',
    honeypot: 'string',
    fields: 'array',
    message: {
      success: 'string',
      fail: 'string',
    },
  },
  mail: {
    to: 'string',
    from: 'string',
    subject: 'string',
    aliases: 'array',
    host: 'string',
    port: 'number',
    secure: 'boolean',
    auth: {
      user: 'string',
      pass: 'string',
    },
  },
};
