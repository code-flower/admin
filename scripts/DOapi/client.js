
const token = require('../../secrets').digitalOceanToken,
      digitalocean = require('digitalocean'),
      client = digitalocean.client(token);

module.exports = client;