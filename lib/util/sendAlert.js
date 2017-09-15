
//////////// IMPORTS ////////////

require('module-alias/register');

const creds = require('@config').sendgrid,
      sg = require('sendgrid')(creds.apiKey);

//////////// PRIVATE ////////////      

function sendAlert(subject, message) {

  if (typeof message === 'object')
    message = JSON.stringify(message);

  let request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [{
        to: [{
          email: creds.email
        }],
        subject: subject
      }],
      from: {
        email: creds.email
      },
      content: [{
        type: 'text/html',
        value: message
      }]
    }
  });
   
  sg.API(request, (err, res) => {
    if (err) {
      console.log("SENDGRID ERROR:", err);
      console.log("ERRORS ARRAY:", res.body.errors);
    }
  });
}

//////////// PUBLIC //////////////

module.exports = sendAlert;

