
///////////////// IMPORTS ///////////////////

require('module-alias/register');

const config = require('@config'),
      client = require('./client'),
      Promise = require('bluebird');

///////////////// CONFIG ////////////////////

const DOMAIN = config.domain;

//////////////// FUNCTIONS //////////////////

function listRecords() {
  return client.domains.listRecords(DOMAIN);
}

function challengeName(subdomain) {
  return '_acme-challenge' + (subdomain ? '.' + subdomain : '');
}

function createDNSChallengeRecord(subdomain, validation) {
  return client.domains.createRecord(DOMAIN, {
    type:     'TXT',
    name:     challengeName(subdomain),
    data:     validation,
    priority: null,
    port:     null,
    ttl:      1800,
    weight:   null
  });
}

function deleteDNSChallengeRecord(subdomain) {
  return listRecords().then(records => {
    return Promise.map(records, record => {;
      if (record.name === challengeName(subdomain))
        return client.domains.deleteRecord(DOMAIN, record.id);
      else
        return Promise.resolve();
    });
  });
}

///////////////// EXPORTS ////////////////////

module.exports = {
  listRecords,
  createDNSChallengeRecord,
  deleteDNSChallengeRecord
};
