#!/usr/bin/env node

//////////////////// IMPORTS ///////////////////////

require('module-alias/register');

const config = require('@config'),
      { deleteDNSChallengeRecord } = require('@lib/DO').domains;

///////////////////// CONFIG ///////////////////////

const DOMAIN = config.domain;

////////////////////// MAIN ////////////////////////

console.log("Domain:", process.env.CERTBOT_DOMAIN);

let subdomain = process.env.CERTBOT_DOMAIN
                .replace(DOMAIN, '')
                .replace('.', '');

deleteDNSChallengeRecord(subdomain);
