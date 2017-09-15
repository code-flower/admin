
//////////////////////////// IMPORTS //////////////////////////////

require('module-alias/register');

const token = require('@config').DOtoken,
      digitalocean = require('digitalocean');

/////////////////////// CONSTRUCT CLIENT //////////////////////////

let client = digitalocean.client(token);
require('./certificatesPatch')(client);

////////////////////////// EXPORT CLIENT /////////////////////////

module.exports = client;