
/*

TODO -- can be a general set of function for syncing
local/remote directories

*/

/////////////////// IMPORTS //////////////////////

require('module-alias/register');

const config = require('@config'),
      { listIPsForTag } = require('./DOapi').droplets,
      { exec } = require('child_process'),
      Promise = require('bluebird');

/////////////////// CONFIG ///////////////////////

const CLOC_SERVER_TAG = config.clocServerTag,
      LOCAL_CERT_DIR  = config.localCertDir,
      REMOTE_USER     = config.remoteUser,
      REMOTE_CERT_DIR = config.remoteCertDir;

////////////////// FUNCTIONS /////////////////////

function syncLocalDirToRemote({localDir, remoteUser, remoteHost, remoteDir}) {
  return new Promise((resolve, reject) => {
    let cmd = `rsync -rL ${localDir} ${remoteUser}@${remoteHost}:${remoteDir}`;
    exec(cmd, (err, stdout, stderr) => {
      if (err)
        reject(err);
      else
        resolve();
    });
  });
}

function syncCertsToIP(IP) {
  return syncLocalDirToRemote({
    localDir:   LOCAL_CERT_DIR + '/',
    remoteUser: REMOTE_USER,
    remoteHost: IP,
    remoteDir:  REMOTE_CERT_DIR
  }).then(() => {
    console.log('synced with:', IP);
  });
}

function syncCertsToAllIPs(IPs) {
  console.log('\nSyncing:', IPs);
  return Promise.map(IPs, IP => syncCertsToIP(IP))
    .then(() => {
      console.log('Done syncing certs.');
      return Promise.resolve(IPs);
    });
}

//////////////////// MAIN ////////////////////////

listIPsForTag(CLOC_SERVER_TAG).then(syncCertsToAllIPs);


