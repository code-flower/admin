
//////////////////// IMPORTS ///////////////////////

const { createDNSChallengeRecord } = require('./DOapi').domains,
      argv = require('minimist')(process.argv);

////////////////////// MAIN ////////////////////////

console.log("Creating DNS record:");
console.log("Value:", argv.validation);

createDNSChallengeRecord(argv.validation);