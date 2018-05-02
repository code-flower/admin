
const fs = require('fs');

module.exports = (outfile, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(outfile, data, 'utf8', err => {
      if (err)
        reject(err);
      else
        resolve();
    });
  });
};
