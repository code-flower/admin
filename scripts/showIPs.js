
/////////////////// IMPORTS //////////////////////

require('module-alias/register');

const config = require('@config'),
      { listIPsForTag } = require('./DOapi').droplets;

/////////////////// CONFIG ///////////////////////

const CLOC_SERVER_TAG = config.clocServerTag;

//////////////////// MAIN ////////////////////////

listIPsForTag(CLOC_SERVER_TAG).then(console.log);