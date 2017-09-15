
////////////////// IMPORTS ///////////////////

let apiCall = require('./apiCall');

////////////////// PRIVATE ///////////////////

function certificatesPatch(client) {

  if (client.certificates) {
    console.error('Client already has a certificates resource. Patch aborted.');
    return false;
  }

  apiCall = apiCall.bind(null, client);

  client.certificates = {
    list: function() {
      return apiCall('get', '/certificates', {}, 200, 'certificates');
    },

    create: function(attrs) {
      return apiCall('post', '/certificates', attrs, 201, 'certificate');
    },

    delete: function(certId) {
      return apiCall('delete', '/certificates/' + certId, {}, 204, []);
    }
  };
}

/////////////////// EXPORTS ///////////////////

module.exports = certificatesPatch;

