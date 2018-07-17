#!/usr/bin/env node

//////////////////// IMPORTS ///////////////////////

require('module-alias/register');

const config = require('@config'),
      certs = require('@lib/DO').certificates,
      lbs = require('@lib/DO').loadBalancers,
      sendAlert = require('@lib/util/sendAlert'),
      Promise = require('bluebird');

///////////////////// CONFIG ///////////////////////

const LOAD_BALANCER_NAME      = config.DO.loadBalancerName;
const CLOC_SERVER_CERT_PREFIX = config.DO.clocServerCertPrefix;

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
    oldCertIds = certs.filter(cert => cert.name !== certName)
                      .map(cert => cert.id);
    return Promise.resolve();
  })
  .then(() => certs.createCertificate(certName))
  .then(newCert => lbs.updateCertId(LOAD_BALANCER_NAME, newCert.id))
  .then(() => Promise.map(oldCertIds, id => certs.deleteCertificate(id)))
  .then(() => {
    console.log('CERT SUCCESSFULLY DEPLOYED ON DO');
    sendAlert('codeflower: cert successfully deployed on DO', '');
  })
  .catch(err => {
    console.log('ERROR DEPLOYING CERT ON DO:', err);
    sendAlert('codeflower: error deploying cert on DO', err);
  });

