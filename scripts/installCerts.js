
const config = require('../config'),
      { getIPsByTag } = require('./getIPs'),
      syncCerts = require('./syncCerts'),
      cautiousReloads = require('./cautiousReloads');

/////////////////// CONFIG ///////////////////////

const CLOC_SERVER_TAG = config.clocServerTag;

//////////////////// MAIN ////////////////////////

getIPsByTag(CLOC_SERVER_TAG)
  .then(syncCerts);
