
///////////////// IMPORTS ///////////////////

require('module-alias/register');

const config = require('@config'),
      client = require('./client'),
      Promise = require('bluebird');

///////////////// CONFIG ////////////////////

const CODEFLOWER_DOMAIN = config.codeflowerDomain,
      DNS_CHALLENGE_NAME = config.DNSChallengeName;

//////////////// FUNCTIONS //////////////////

function listRecords() {
  return client.domains.listRecords(CODEFLOWER_DOMAIN);
}

function createDNSChallengeRecord(validation) {
  return client.domains.createRecord(CODEFLOWER_DOMAIN, {
    type:     'TXT',
    name:     DNS_CHALLENGE_NAME,
    data:     validation,
    priority: null,
    port:     null,
    ttl:      1800,
    weight:   null
  });
}

function deleteDNSChallengeRecord() {
  return listRecords().then(records => {
    return Promise.map(records, record => {
      if (record.name === DNS_CHALLENGE_NAME)
        return client.domains.deleteRecord(CODEFLOWER_DOMAIN, record.id);
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
