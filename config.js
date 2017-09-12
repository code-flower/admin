
const path = require('path');

module.exports = {
  clocServerTag: 'cloc-server',
  localCertDir:  path.join(__dirname, './sslCert'),
  remoteUser:    'root',
  remoteCertDir: '/etc/letsencrypt/live/api.codeflower.la/'
};
