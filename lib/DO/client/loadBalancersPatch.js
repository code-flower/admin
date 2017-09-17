
////////////////// IMPORTS ///////////////////

let apiCall = require('./apiCall');

////////////////// PRIVATE ///////////////////

function loadBalancersPatch(client) {

  if (client.loadBalancers) {
    console.error('Client already has a certificates resource. Patch aborted.');
    return false;
  }

  apiCall = apiCall.bind(null, client);

  client.loadBalancers = {
    list: function() {
      return apiCall('get', '/load_balancers', {}, 200, 'load_balancers');
    },

    update: function(lbId, attrs) {
      return apiCall('put', '/load_balancers/' + lbId, attrs, 200, 'load_balancer');
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

module.exports = loadBalancersPatch;