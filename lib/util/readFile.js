
const fs = require('fs');

module.exports = (infile) => {
  return new Promise((resolve, reject) => {
    fs.readFile(infile, 'utf8', (err, data) => {
      if (err)
        reject(err);
      else
        resolve(data);
    });
  });
};
