
///////////////// IMPORTS ///////////////////

const token = require('../secrets').digitalOceanToken,
      digitalocean = require('digitalocean'),
      client = digitalocean.client(token);

//////////////// FUNCTIONS //////////////////

function getIPs(name) {
  return client.droplets.list().then(droplets => {
    return droplets
      .filter(droplet => droplet.name === name)
      .map(droplet => droplet.networks.v4[0].ip_address);
  });
}

////////////////// MAIN /////////////////////

getIPs('cloc-server').then(console.log);
