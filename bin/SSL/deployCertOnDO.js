#!/usr/bin/env node

//////////////////// IMPORTS ///////////////////////

require('module-alias/register');

const config = require('@config'),
      certs = require('@lib/cloud').certificates,
      lbs = require('@lib/cloud').loadBalancers,
      sendAlert = require('@lib/util/sendAlert'),
      Promise = require('bluebird');

///////////////////// CONFIG ///////////////////////

const LOAD_BALANCER_NAME = config.loadBalancerName;
const CLOC_SERVER_CERT_PREFIX = config.clocServerCertPrefix;

////////////////////// MAIN ////////////////////////

let oldCertIds,
    dateString = (new Date())
      .toLocaleString()
      .replace(' ', '-')
      .replace(':', '-')
      .replace(':', '-')
    certName = CLOC_SERVER_CERT_PREFIX + dateString;

certs.listCertificates()
  .then(certs => {
    oldCertIds = certs.map(cert => cert.id);
    return Promise.resolve();
  })
  .then(() => certs.createCertificate(certName))
  .then(newCert => lbs.updateCertId(LOAD_BALANCER_NAME, newCert.id))
  .then(() => Promise.map(oldCertIds, id => certs.deleteCertificate(id)))
  .then(() => {
    console.log('CERT SUCCESSFULLY UPDATED');
    sendAlert('codeflower: cert successfully update', '');
  })
  .catch(err => {
    console.log('ERROR UPDATING CERT:', err);
    sendAlert('codeflower: error updating cloc-server SSL cert', err);
  });

