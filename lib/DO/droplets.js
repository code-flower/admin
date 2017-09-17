
///////////////// IMPORTS ///////////////////

const client = require('./client');

//////////////// FUNCTIONS //////////////////

function listDroplets() {
  return client.droplets.list();
}

function listIPsForName(name) {
  return listDroplets().then(droplets => {
    return droplets
      .filter(droplet => droplet.name === name)
      .map(droplet => droplet.networks.v4[0].ip_address);
  });
}

function listIPsForTag(tag) {
  return listDroplets().then(droplets => {
    return droplets
      .filter(droplet => droplet.tags.indexOf(tag) !== -1)
      .map(droplet => droplet.networks.v4[0].ip_address);
  });
}

////////////////// MAIN /////////////////////

module.exports = {
  listDroplets,
  listIPsForName,
  listIPsForTag
};
