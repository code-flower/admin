#!/usr/bin/env node

//////////////////// IMPORTS ///////////////////////

const { deleteDNSChallengeRecord } = require('../lib/cloud').domains;

////////////////////// MAIN ////////////////////////

console.log("Deleting DNS record");
deleteDNSChallengeRecord();