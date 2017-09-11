
/////////////////// IMPORTS //////////////////////

const config = require('../config'),
      getIPs = require('./getIPs').getIPsByTag,
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
    let cmd = `rsync -a ${localDir} ${remoteUser}@${remoteHost}:${remoteDir}`;
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
    console.log("synced with:", IP);
  });
}

function syncCertsToAllIPs(IPs) {
  return Promise.map(IPs, IP => syncCertsToIP(IP));
}

//////////////////// MAIN ////////////////////////

getIPs(config.clocServerTag).then(IPs => {
  console.log('IPs:', IPs);
  syncCertsToAllIPs(IPs).then(() => console.log("DONE"));
});


