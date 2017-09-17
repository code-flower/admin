//////////////////// IMPORTS ////////////////////////

const client = require('./client'),
      Promise = require('bluebird');

/////////////////// FUNCTIONS ///////////////////////

function listLoadBalancers() {
  return client.loadBalancers.list();
}

function getLoadBalancerByName(lbName) {
  return listLoadBalancers()
    .then(lbs => {
      let lbsWithName = lbs.filter(lb => lb.name === lbName);
      if (lbsWithName.length)
        return Promise.resolve(lbsWithName[0])
      else
        return Promise.resolve(null);
    });
}

function updateCertId(lbName, newCertId) {
  return getLoadBalancerByName(lbName)
    .then(LB => {
      if (LB) {

        // extract the id and remove from the object
        let lbId = LB.id;
        delete LB.id;

        // remote the droplet_ids because we're using a tag
        delete LB.droplet_ids;

        // need to change the region format to make the request work
        LB.region = LB.region.slug;

        // update forwarding rules to use the new cert id
        for (var i = 0; i < LB.forwarding_rules.length; i++) {
          let rule = LB.forwarding_rules[i];
          if (rule.certificate_id)
            rule.certificate_id = newCertId;
        }

        return client.loadBalancers.update(lbId, LB);
      } else 
        return Promise.reject('no load balancer found.');
    });
}

///////////////////// EXPORTS ///////////////////////

module.exports = {
  listLoadBalancers,
  getLoadBalancerByName,
  updateCertId
}

