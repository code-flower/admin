
///////////////// IMPORTS ///////////////////

const client = require('./client');

//////////////// FUNCTIONS //////////////////

function listMachines() {
  return client.droplets.list();
}

function listIPsForName(name) {
  return listMachines().then(machines => {
    return machines
      .filter(machine => machine.name === name)
      .map(machine => machine.networks.v4[0].ip_address);
  });
}

function listIPsForTag(tag) {
  return listMachines().then(machines => {
    return machines
      .filter(machine => machine.tags.indexOf(tag) !== -1)
      .map(machine => machine.networks.v4[0].ip_address);
  });
}

////////////////// MAIN /////////////////////

module.exports = {
  listMachines,
  listIPsForName,
  listIPsForTag
};
