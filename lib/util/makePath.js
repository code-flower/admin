
const mkpath = require('mkpath');

module.exports = path => {
  try {
    mkpath.sync(path);
  } catch(e) {
    console.log('Error making path:', err);
  }
  return path;
}
