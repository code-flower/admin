
//////////////////////////// IMPORTS //////////////////////////////

const token = require('../../secrets').digitalOceanToken,
      digitalocean = require('digitalocean'),
      client = digitalocean.client(token),
      Promise = require('bluebird');

/////////////////////////// FUNCTIONS /////////////////////////////

function doRequest(type, endpoint, attrs, statusCode, keyReturned) {
  return new Promise((resolve, reject) => {
    client[type](endpoint, attrs, statusCode, keyReturned, (err, response, headers, body) => {

      // console.log("err:", err);
      // console.log("\nresponse:", response);
      // console.log("\nheaders:", headers);
      // console.log("\nbody:", body);

      if (err)
        reject(err);
      else {
        if (keyReturned || keyReturned.length)
          resolve(body[keyReturned]);
        else 
          resolve(null);
      }
    });
  });
}

//////////////// MONKEYPATCH CERTIFICATES RESOURCE ///////////////

client.certificates = {
  list: function() {
    return doRequest('get', '/certificates', {}, 200, 'certificates');
  },

  create: function(attrs) {
    return doRequest('post', '/certificates', attrs, 201, 'certificate');
  },

  delete: function(certId) {
    return doRequest('delete', '/certificates/' + certId, {}, 204, []);
  }
};

////////////////////////// EXPORT CLIENT /////////////////////////

module.exports = client;