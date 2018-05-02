#!/usr/bin/env node

require('module-alias/register');

/////////////////// IMPORTS //////////////////////

const Promise = require('bluebird');
const rp = require('request-promise');
const config = require('@config');
const { listIPsForTag } = require('@lib/DO').droplets;
const sendAlert = require('@lib/util/sendAlert');
const exec = require('@lib/util/exec');

/////////////////// CONFIG ///////////////////////

const CLOC_SERVER_TAG = config.DO.clocServerTag;
const REMOTE_LOG_FILE = '/root/cloc-server/logs/out.log';

//////////////////// FUNCTIONS ///////////////////

function healthCheck(IPs) {
  return Promise.map(IPs, IP => {
    return rp(`http://${IP}:28464/health`, {
      resolveWithFullResponse: true
    })
      .then(res => [ IP, res.statusCode ]);
  })
  .then(responses => {
    responses.forEach(res => {
      console.log(`${res[0]}: ${res[1]}`);
    });
    console.log('');
    return null;
  });
}

function getLogs(IPs) {
  return Promise.mapSeries(IPs, IP => {
    return exec(`ssh root@${IP} 'cat ${REMOTE_LOG_FILE}'`)
      .catch(() => `No log file for ${IP}.`)
  })
  .then(logs => {
    IPs.forEach((IP, idx) => {
      console.log(`------------- ${IP} ---------------`);
      if (logs[idx])
        console.log(logs[idx]);
      else
        console.log('No log content.\n');
    })
    return null;
  });
}

function clearLogs(IPs) {
  return Promise.mapSeries(IPs, IP => {
    return exec(`ssh root@${IP} 'echo -n > ${REMOTE_LOG_FILE}'`)
      .catch(() => null)
  });
}

//////////////////// MAIN //////////////////////

listIPsForTag(CLOC_SERVER_TAG)
  .then(IPs => {
    return healthCheck(IPs)
      .then(() => getLogs(IPs))
      .then(() => clearLogs(IPs));
  });



