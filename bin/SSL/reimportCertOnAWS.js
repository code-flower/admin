#!/usr/bin/env node

//////////////////// IMPORTS ///////////////////////

require('module-alias/register');

const certs = require('@lib/AWS').certificates,
      sendAlert = require('@lib/util/sendAlert');

///////////////////// MAIN /////////////////////////

certs.importCertificate()
  .then(() => {
    console.log('CERT SUCCESSFULLY REIMPORTED ON AWS');
    sendAlert('codeflower: cert successfully reimported on AWS', '');
  })
  .catch(err => {
    console.log('ERROR REIMPORTING CERT ON AWS:', err);
    sendAlert('codeflower: error reimporting cert on AWS', err);
  });