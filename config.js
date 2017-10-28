
const secrets = require('./secrets');

module.exports = {

  // domains
  domain: 'codeflower.la',
  subdomains: {
    api:   'api',
    admin: 'admin'
  },

  // digital ocean
  DO: {
    token:                 secrets.DOtoken,
    clocServerTag:        'cloc-server',
    clocServerCertPrefix: 'cloc-server-cert-',
    loadBalancerName:     'cloc-server-lb'
  },

  AWS: {
    creds: secrets.AWScreds,
  },

  // cert management
  cert: {
    path:         '/etc/letsencrypt/live/api.codeflower.la/',
    privateKey:   'privkey.pem',
    certificate:  'cert.pem',
    fullChain:    'fullchain.pem',
  },

  // sendgrid
  sendgrid: secrets.sendgrid

};
