#!/usr/bin/env node

//////////////////// IMPORTS ///////////////////////

require('module-alias/register');

const { deleteDNSChallengeRecord } = require('@lib/cloud').domains;

////////////////////// MAIN ////////////////////////

console.log("Deleting DNS challenge record");
deleteDNSChallengeRecord();
