

## Overview

Provides admin functionality for the entire codeflower application.

`bin` contains executables; `lib` contains functions.

## Installation

1. install git

```
sudo apt-get update
sudo apt-get install git
```

2. install node 8.5.0 and npm

Instructions here: https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. install certbot

sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot

4. clone this repo and `cd` into it

5. run `npm install`

6. set up crontab to run SSH renewal script once a month

# open crontab
crontab -e
# add this line
38 16 16 * * cd /root/admin/bin/SSL && ./renewCert.js
0 7 * * * cd /root/admin && npm run status-report

## Global SSL Notes

UPDATE 3/20/19 -- Digital Ocean now creates and renews the SSL certs on its own, so the renewal script no longer applies to DO. Still applies to AWS.

UPDATE 7/5/19 -- The client is now hosted on firebase, which maintains SSL certs on its own, so the renewal script is no longer necessary at all. Deleted the line from crontab.

-----

The cloc-server and client-web application both use the same SSL cert. The cert files are generate by letsencrypt/certbot and live on the admin server. They expire every 90 days. There is a cronjob on the admin server that checks whether the certs need to be renewed and renews them when the expiration date is close.

The cloc-server itself serves over HTTP, not HTTPS. But all the droplets running the cloc-server application are behind a load-balancer that holds the cert. The load balancer communicates with the droplets over HTTP (they are all behind a firewell so that's ok), but the load balancer serves outbound traffic over HTTPS. This is the so-called SSL-termination configuration (as opposed to SSL-passthrough, where the certs are on the individual droplets and they communicate with the load balancer over HTTPS). More information on the config is here -- https://www.digitalocean.com/community/tutorials/how-to-configure-ssl-termination-on-digitalocean-load-balancers.

With respect to the client-web application, distributable files live in an s3 bucket, and are served to users via a cloudfront distribution. That distribution is configured to take the cert from AWS' Certificate Manager, which holds the cert.

The cert renewal cronjob has a --deploy hook that calls two scripts. One of those scripts uploads the renewed cert to the DO load balancer, and the other reimports the renewed certificate on AWS. Both script send emails to admin containing the outcome of the upload job.

## Actions

### SSL Certs

1. generate a cert: `cd bin/SSL; ./createCert.sh`

2. replace the cert on digital ocean: `cd bin/SSL; ./deployCertOnDO.js`

3. reimport a cert on AWS: `cd bin/SSL; ./reimportCertOnAWS.js`

4. renew the existing cert, and if it renews successfully, replace the cert on DO and AWS: `cd bin/SSL; ./renewCert.sh`

### Health Check

1. runs a health check on all running 'cloc-server' droplets and send email: `cd bin; ./healthCheck.js`

## Actions to automate

### Monitoring

1. open an iTerm tab for each running 'cloc-server' droplet and run `pm2 monit` in that window

2. open an iTerm tab for each running 'cloc-server' droplet and run the connection monitor in that window

### Logs

1. view logs for all running droplets for the last -d days

### Droplets

1. delete a droplet without dropping any connections
