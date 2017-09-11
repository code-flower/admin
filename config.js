
const path = require('path');

module.exports = {
  clocServerTag: 'load-balanced',
  localCertDir:  path.join(__dirname, '../sslCert'),
  remoteUser:    'root',
  remoteCertDir: '/root/testCertDir',
  //remoteCertDir: '/etc/letsencrypt/live/api.codeflower.la/'
};