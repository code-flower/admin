/*
  This module wraps the 'aws-sdk' module so that:
  (1) you only have to configure AWS access once
  (2) you only have to instantiate the AWS services once
  (3) all of the SDK methods return promises instead of accepting callbacks
  (4) all of the SDK methods have consistent logging
*/

const AWS = require('aws-sdk');
const config = require('@config');

module.exports = (function() {

  //// CONFIGURE AWS ACCESS ////
  AWS.config.update({
    ...config.AWS.creds,
    region: 'us-east-1'
  });

  //// INSTANTIATE SDK SERVICES ////
  let services = {
    acm: new AWS.ACM({apiVersion: '2015-12-08'})
  };

  //// PROMISIFY SDK METHODS/ADD LOGGING FUNCTIONALITY
  return function AWSSDK(serviceStr, methodStr, params, log) {
    return new Promise((resolve, reject) => {

      // grab the right service
      let service = services[serviceStr];

      // call the right method
      service[methodStr].call(service, params, function(err, data) {

        if (err) {

          if (!log || !log.hideErrors) {
            console.log("AWS SDK ERROR: " + methodStr);
            console.log("PARAMS:\n", params);
            console.log("ERROR OBJECT:\n", err);
          }
          reject(err);

        } else {

          if (log && log.logAll) {
            console.log("SUCCESS: " + methodStr);
            console.log("PARAMS: ", params);
            console.log("RESULT: ", data);
          } else if (log && log.success) {
            console.log(log.success);
          }
          resolve(data);

        }
      });
    });
  }

})();
