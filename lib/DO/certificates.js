
//////////////////// IMPORTS ////////////////////////

require('module-alias/register');

const config = require('@config'),
      client = require('./client'),
      fs = require('fs');

//////////////////// CONFIG /////////////////////////

const CERT_PATH   = config.cert.path,
      PRIVATE_KEY = config.cert.privateKey,
      CERTIFICATE = config.cert.certificate,
      FULL_CHAIN  = config.cert.fullChain

/////////////////// FUNCTIONS ///////////////////////

function listCertificates() {
  return client.certificates.list();
}

function createCertificate(certName) {
  let attrs = {
    name: certName,
    private_key:       fs.readFileSync(CERT_PATH + PRIVATE_KEY, 'utf8'),
    leaf_certificate:  fs.readFileSync(CERT_PATH + CERTIFICATE, 'utf8'),
    certificate_chain: fs.readFileSync(CERT_PATH + FULL_CHAIN,  'utf8')
  };

  return client.certificates.create(attrs);
}

function deleteCertificate(certId) {
  return client.certificates.delete(certId);
}

//////////////////// EXPORTS ////////////////////////

module.exports = {
  listCertificates,
  createCertificate,
  deleteCertificate
};

