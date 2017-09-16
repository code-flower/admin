
const secrets = require('./secrets');

module.exports = {
  codeflowerDomain:    'codeflower.la',
  codeflowerApiDomain: 'api.codeflower.la',

  // DO token and resources
  DOtoken:              secrets.DOtoken,
  clocServerTag:        'cloc-server',
  clocServerCertPrefix: 'cloc-server-cert-',
  loadBalancerName:     'cloc-server-lb',

  // cert management
  DNSChallengeName: '_acme-challenge.api',
  localCertDir:     '/etc/letsencrypt/live/api.codeflower.la/',
  privkey:          'privkey.pem',
  cert:             'cert.pem',
  fullChain:        'fullchain.pem',

  // sendgrid
  sendgrid: secrets.sendgrid
};
