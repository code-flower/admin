
const { exec } = require('child_process'),
      Promise = require('bluebird');

module.exports = (cmd, opts) => {
  return new Promise((resolve, reject) => {
    exec(cmd, opts, (err, stdout, stderr) => {
      if (err)
        reject(err);
      else
        resolve(stdout);
    });
  });
};