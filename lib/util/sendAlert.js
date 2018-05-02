
const rp = require('request-promise');
const ENDPOINT = 'https://n59l5znql4.execute-api.us-east-1.amazonaws.com/latest';

// note: params is on object with a subject field and either a text or html field
function sendEmail(params) {
  return rp({
    url: ENDPOINT,
    method: 'post',
    body: params,
    json: true
  });
}

module.exports = sendEmail;

