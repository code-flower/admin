#!/usr/bin/env node

const cloud = require('../lib/cloud'),
      exec = require('../lib/util/exec'),
      sendAlert = require('../lib/util/sendAlert');


cloud.machines.listIPsForTag('cloc-server').then(console.log);


// exec('ls', {cwd: 'bi'}).then(console.log).catch(err => {
//   sendAlert('ls error', err);
// });

// console.log({jake: 3, joe: 4}.toString());
