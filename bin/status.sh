#!/usr/bin/env node

require('module-alias/register');

/////////////////// IMPORTS //////////////////////

const Promise = require('bluebird');
const moment = require('moment');
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
  // .then(logs => {
  //   IPs.forEach((IP, idx) => {
  //     console.log(`------------- ${IP} ---------------`);
  //     if (logs[idx])
  //       console.log(logs[idx]);
  //     else
  //       console.log('No log content.\n');
  //   })
  //   return null;
  // });
  .then(logs => logs.map((log, idx) => {
    return log
      .split('\n')
      .filter(entry => !!entry)
  }))
  .then(logs => logs.reduce((p, c) => p.concat(c), []))
  .then(entries => entries.sort((a, b) => {
    let aDate = a.match(/(\d{4}.*?\d{2}):\s/)[1];
    let bDate = b.match(/(\d{4}.*?\d{2}):\s/)[1];
    return moment(bDate).isBefore(moment(aDate)) ? 1 : -1;
  }))
  .then(entries => entries.reduce((p, c) => {
    if (c.indexOf('SUCCESS') !== -1)
      p.success.push(c);
    else
      p.error.push(c);
    return p;
  }, { success: [], error: [] }))
  .then(logs => {
    logs.success.forEach(log => console.log(log));
    console.log('');
    logs.error.forEach(log => console.log(log));
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
