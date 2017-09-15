
//////////////////// IMPORTS ///////////////////////

const Promise = require('bluebird');

//////////////////// PRIVATE ///////////////////////

function apiCall(client, type, endpoint, attrs, statusCode, keyReturned) {
  return new Promise((resolve, reject) => {
    client[type](endpoint, attrs, statusCode, keyReturned, (err, response, headers, body) => {

      // console.log("err:", err);
      // console.log("\nresponse:", response);
      // console.log("\nheaders:", headers);
      // console.log("\nbody:", body);

      if (err)
        reject(err);
      else {
        if (keyReturned || keyReturned.length)
          resolve(body[keyReturned]);
        else 
          resolve(null);
      }
    });
  });
}

///////////////////// EXPORTS ///////////////////////

module.exports = apiCall;