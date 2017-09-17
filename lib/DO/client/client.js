
//////////////////////////// IMPORTS //////////////////////////////

require('module-alias/register');

const token = require('@config').DO.token,
      digitalocean = require('digitalocean');

/////////////////////// CONSTRUCT CLIENT //////////////////////////

let client = digitalocean.client(token);
require('./certificatesPatch')(client);
require('./loadBalancersPatch')(client);

////////////////////////// EXPORT CLIENT /////////////////////////

module.exports = client;