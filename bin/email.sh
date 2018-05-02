#!/usr/bin/env node

/*
  Sends an mail to admin.

  if there's stdin (i.e. the script follows a pipe), then the text of the email is
  the contents of stdin. Otherwise the text is the text arg.

  A subject arg is required.
*/

/////////// IMPORTS ///////////

require('module-alias/register');
const sendAlert = require('@lib/util/sendAlert');
const argv = require('minimist')(process.argv.slice(2));

//////////// ARGS /////////////

let subject = argv.subject || '';
let text = argv.text || '';

////////// FUNCTIONS //////////

function send(subject, text) {
  return new Promise((resolve, reject) => {
    if (text) {
      return sendAlert({
        subject,
        html: text.replace(/\n/g, '<br />')
      });
    } else {
      console.log('There is no text to send');
      return Promise.resolve();
    }
  });
}

//////////// MAIN /////////////

if (!subject) {
  console.log('You must provide a subject for the email.');
} else if (text) {
  send(subject, text);
} else {
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', () => {
    let chunk = process.stdin.read();
    if (chunk !== null)
      text += chunk;
    else {
      console.log(text);
      send(subject, text).then(() => process.exit(0));
    }
  });
}
