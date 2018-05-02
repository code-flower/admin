#!/usr/bin/env node

require('module-alias/register');

/////////////////// IMPORTS //////////////////////

const Promise = require('bluebird');
const rp = require('request-promise');
const config = require('@config');
const { listIPsForTag } = require('@lib/DO').droplets;
const sendAlert = require('@lib/util/sendAlert');
const exec = require('@lib/util/exec');
const makePath = require('@lib/util/makePath');
const readFile = require('@lib/util/readFile');
const writeFile = require('@lib/util/writeFile');

/////////////////// CONFIG ///////////////////////

const CLOC_SERVER_TAG = config.DO.clocServerTag;
const LOGS_DIR = makePath(__dirname + '/tmp');
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
    console.log('HEALTH CHECKS');
    responses.forEach(res => {
      console.log(`${res[0]}: ${res[1]}`);
    });
    return null;
  });
}

function getLogs(IPs) {
  return Promise.mapSeries(IPs, IP => {
    return exec(`ssh root@${IP} 'cat ${REMOTE_LOG_FILE}'`)
      .catch(() => 'No log file.')
  })
  .then(logs => {
    IPs.forEach((IP, idx) => {
      console.log(`\n------------- ${IP} ---------------`);
      if (logs[idx])
        console.log(logs[idx]);
      else
        console.log('No log content.');
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



