#!/usr/bin/env node

// checks the health of each cloc-server and sends an email to admin

require('module-alias/register');

/////////////////// IMPORTS //////////////////////

const request = require('request-promise');
const Promise = require('bluebird');
const config = require('@config');
const { listIPsForTag } = require('@lib/DO').droplets;
const sendAlert = require('@lib/util/sendAlert');

/////////////////// CONFIG ///////////////////////

const CLOC_SERVER_TAG = config.DO.clocServerTag;

//////////////////// MAIN ////////////////////////

listIPsForTag(CLOC_SERVER_TAG)
  .then(IPs => {
    return Promise.map(IPs, IP => {
      return request(`http://${IP}:28464/health`, {
        resolveWithFullResponse: true
      })
      .then(res => {
        return [ IP, res.statusCode ];
      })
    })
  })
  .then(responses => {
    let msg = '';
    responses.forEach(res => {
      msg += `${res[0]}: ${res[1]} <br/>`
    });
    sendAlert('cloc-server health checks:', msg);
  });
