#!/usr/bin/env node

/////////////////// IMPORTS //////////////////////

require('module-alias/register');

const config = require('@config'),
      { listIPsForTag } = require('@lib/DO').droplets;

/////////////////// CONFIG ///////////////////////

const CLOC_SERVER_TAG = config.DO.clocServerTag;

//////////////////// MAIN ////////////////////////

listIPsForTag(CLOC_SERVER_TAG).then(console.log);