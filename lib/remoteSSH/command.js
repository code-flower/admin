
/*

TODO -- refactor this to be a general set of functions for 
running commands on remote machines.

*/

/////////////////// IMPORTS /////////////////////

require('module-alias/register');

const config = require('@config'),
      { listIPsForTag } = require('@lib/DO').droplets,
      { exec } = require('child_process'),
      Promise = require('bluebird');

////////////////// CONSTANTS ////////////////////

const CLOC_SERVER_TAG = config.DO.clocServerTag;

////////////////// FUNCTIONS ////////////////////

function cautiousReload(IP) {
  return new Promise((resolve, reject) => {
    let cmd = `ssh root@${IP} 'pm2 trigger pm2-cautious-reload reload codeflower'`;
    exec(cmd, (err, stdout, stderr) => {
      if (err)
        reject(err);
      else
        resolve();
    });
  })
  .then(() => console.log('reloaded:', IP));
}

function cautiousReloads(IPs) {
  console.log('\nReloading:', IPs);
  return Promise.map(IPs, IP => cautiousReload(IP))
    .then(() => {
      console.log('Done cautious reloads.');
      return Promise.resolve(IPs);
    });
}

/////////////////// EXPORTS /////////////////////

listIPsForTag(CLOC_SERVER_TAG).then(cautiousReloads);


