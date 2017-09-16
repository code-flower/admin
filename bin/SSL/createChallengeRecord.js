#!/usr/bin/env node

//////////////////// IMPORTS ///////////////////////

require('module-alias/register');

const { createDNSChallengeRecord } = require('@lib/cloud').domains;

////////////////////// MAIN ////////////////////////

console.log("Creating DNS challenge record:");
console.log(process.env.CERTBOT_DOMAIN);
console.log(process.env.CERTBOT_VALIDATION);

createDNSChallengeRecord(process.env.CERTBOT_VALIDATION);