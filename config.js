
const secrets = require('./secrets');

module.exports = {
  codeflowerDomain: 'codeflower.la',
  clocServerTag:    'cloc-server',

  //localCertDir:     '/etc/letsencrypt/live/api.codeflower.la/',
  localCertDir:     __dirname + '/../sslAdmin/',
  privkey:   'privkey.pem',
  cert:      'cert.pem',
  fullChain: 'fullchain.pem',

  // remote these two if we go to ssl-termination
  remoteUser:       'root',
  remoteCertDir:    '/etc/letsencrypt/live/api.codeflower.la/',

  DNSChallengeName: '_acme-challenge.api',

  sendgrid: secrets.sendgrid,
  DOtoken: secrets.DOtoken
};
