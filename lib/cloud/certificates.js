
//////////////////// IMPORTS ////////////////////////

require('module-alias/register');

const config = require('@config'),
      client = require('./client'),
      fs = require('fs');

//////////////////// CONFIG /////////////////////////

const CERT_DIR   = config.localCertDir,
      PRIV_KEY   = config.privkey,
      CERT       = config.cert,
      FULL_CHAIN = config.fullChain

/////////////////// FUNCTIONS ///////////////////////

function listCertificates() {
  return client.certificates.list();
}

function createCertificate(certName) {
  let attrs = {
    name: certName,
    private_key:       fs.readFileSync(CERT_DIR + PRIV_KEY, 'utf8'),
    leaf_certificate:  fs.readFileSync(CERT_DIR + CERT, 'utf8'),
    certificate_chain: fs.readFileSync(CERT_DIR + FULL_CHAIN, 'utf8')
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

