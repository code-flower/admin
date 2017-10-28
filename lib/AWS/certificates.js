
require('module-alias/register');

////////////////// IMPORTS /////////////////

const AWSSDK = require('./AWSSDK');
const config = require('@config');
const fs = require('fs');

///////////// PRIVATE FUNCTIONS ////////////

function getCertificateArn(domain) {
  return AWSSDK('acm', 'listCertificates', {})
    .then(({ CertificateSummaryList: certs }) => {
      let domainCert = certs.filter(cert => cert.DomainName === domain)[0];
      if (domainCert)
        return domainCert.CertificateArn;
      else
        return null;
    });
}

////////////// PUBLIC FUNCTIONS ////////////

function importCertificate() {
  let { path, privateKey, certificate, fullChain } = config.cert;
  return AWSSDK('acm', 'importCertificate', {
    Certificate:      fs.readFileSync(path + certificate, 'utf8'),
    PrivateKey:       fs.readFileSync(path + privateKey,  'utf8'),
    CertificateChain: fs.readFileSync(path + fullChain,   'utf8')
  });
}

function reimportCertificate() {
  return getCertificateArn(config.domain)
    .then(certArn => {
      let { path, privateKey, certificate, fullChain } = config.cert;
      return AWSSDK('acm', 'importCertificate', {
        Certificate:      fs.readFileSync(path + certificate, 'utf8'),
        PrivateKey:       fs.readFileSync(path + privateKey,  'utf8'),
        CertificateChain: fs.readFileSync(path + fullChain,   'utf8'),
        CertificateArn:   certArn
      });
    });
}

////////////////// EXPORTS /////////////////

module.exports = {
  importCertificate,
  reimportCertificate
};

