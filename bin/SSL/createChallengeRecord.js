#!/usr/bin/env node

//////////////////// IMPORTS ///////////////////////

require('module-alias/register');

const config = require('@config'),
      { createDNSChallengeRecord } = require('@lib/DO').domains;

///////////////////// CONFIG ///////////////////////

const DOMAIN = config.domain;

////////////////////// MAIN ////////////////////////

console.log("Domain:    ", process.env.CERTBOT_DOMAIN);
console.log("Validation:", process.env.CERTBOT_VALIDATION);

let subdomain = process.env.CERTBOT_DOMAIN
                .replace(DOMAIN, '')
                .replace('.', '');

createDNSChallengeRecord(subdomain, process.env.CERTBOT_VALIDATION);

