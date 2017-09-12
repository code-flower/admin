
///////////////// IMPORTS ///////////////////

require('module-alias/register');

const config = require('@config'),
      client = require('./client');

///////////////// CONFIG ////////////////////

const CODEFLOWER_DOMAIN = config.codeflowerDomain;

//////////////// FUNCTIONS //////////////////

function listRecords() {
  return client.domains.listRecords(CODEFLOWER_DOMAIN);
}

function createDNSChallengeRecord(recordName, recordData) {
  return client.domains.createRecord(CODEFLOWER_DOMAIN, {
    type: 'TXT',
    name: recordName,
    data: recordData,
    priority: null,
    port: null,
    ttl: 1800,
    weight: null
  });
}

function deleteDNSChallengeRecord(recordId) {
  return client.domains.deleteRecord(CODEFLOWER_DOMAIN, recordId)
}

///////////////// EXPORTS ////////////////////

module.exports = {
  listRecords,
  createDNSChallengeRecord,
  deleteDNSChallengeRecord
};

