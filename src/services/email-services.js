const config = require('../config')
const sendgrid = require('sendgrid')(config.sendgridKey)

exports.send = (to, subject, html) => {
  sendgrid.send({
    to: to,
    from: 'hello@apinodestore.com',
    subject: subject,
    html: html
  })
}