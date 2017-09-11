
///////////////// IMPORTS ///////////////////

const token = require('../secrets').digitalOceanToken,
      digitalocean = require('digitalocean'),
      client = digitalocean.client(token);

//////////////// FUNCTIONS //////////////////

function getIPsByName(name) {
  return client.droplets.list().then(droplets => {
    return droplets
      .filter(droplet => droplet.name === name)
      .map(droplet => droplet.networks.v4[0].ip_address);
  });
}

function getIPsByTag(tag) {
  return client.droplets.list().then(droplets => {
    return droplets
      .filter(droplet => droplet.tags.indexOf(tag) !== -1)
      .map(droplet => droplet.networks.v4[0].ip_address);
  });
}

////////////////// MAIN /////////////////////

module.exports = {
  getIPsByName,
  getIPsByTag
};
