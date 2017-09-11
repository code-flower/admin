
/////////////////// IMPORTS /////////////////////

const config = require('../config'),
      { exec } = require('child_process'),
      Promise = require('bluebird');

////////////////// CONSTANTS ////////////////////

const REMOTE_USER = config.remoteUser;

////////////////// FUNCTIONS ////////////////////

// function cautiousReload(IP) {
//   return new Promise((resolve, reject) => {
//     let cmd = `ssh root@api.codeflower.la ` + 
//               `-tt 'PATH="/root/.nvm/versions/node/v8.4.0/bin:$PATH"; pm2 trigger pm2-cautious-reload reload codeflower'`;

//     exec(cmd, (err, stdout, stderr) => {
//       console.log("ERR:", err);
//       console.log("STDOUT:", stdout);
//       console.log("STDERR:", stderr);
//     });
//   })
//   .then(() => console.log("Reloaded:", IP));
// }

function cautiousReload(IP) {
  return new Promise((resolve, reject) => {
    console.log('Reloaded:', IP);
    resolve();
  });
}

function cautiousReloads(IPs) {
  return Promise.map(IPs, IP => cautiousReload(IP))
    .then(() => {
      console.log('Done cautious reloads.');
      return Promise.resolve(IPs);
    });
}

/////////////////// EXPORTS /////////////////////

module.exports = cautiousReloads;