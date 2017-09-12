
//////////////////// IMPORTS ///////////////////////

const { deleteDNSChallengeRecord } = require('./DOapi').domains;

////////////////////// MAIN ////////////////////////

console.log("Deleting DNS record");
deleteDNSChallengeRecord();