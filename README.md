

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

## Actions

### Droplets

1. create a droplet, copy an SSL cert to it, start the server with pm2, and save the processes

2. delete a droplet without dropping any connections

### SSL Certs

1. generate a cert: `cd bin/SSL; ./createCert.sh`

2. replace the cert on digital ocean: `cd bin/SSL; ./deployCertOnDO.js`

3. renew the existing cert, and if it renews successfully, replace the cert on DO: `cd bin/SSL; ./renewCert.sh`

### Monitoring

1. open an iTerm tab for each running 'cloc-server' droplet and run `pm2 monit` in that window

2. open an iTerm tab for each running 'cloc-server' droplet and run the connection monitor in that window

3. health check -- runs a health check on all running 'cloc-server' droplets

### Logs

1. view logs for all running droplets for the last -d days

## Global SSL Notes

The cloc-server and client-web application both use the same SSL cert. The cert files are generate by letsencrypt/certbot and live on the admin server. They expire every 90 days. There is a cronjob on the admin server that checks whether the certs need to be renewed and renews them when the expiration date is close.

The cloc-server itself serves over HTTP, not HTTPS. But all the droplets running the cloc-server application are behind a load-balancer that holds the cert. The load balancer communicates with the droplets over HTTP (they are all behind a firewell so that's ok), but the load balancer serves outbound traffic over HTTPS. This is the so-called SSL-termination configuration (as opposed to SSL-passthrough, where the certs are on the individual droplets and they communicate with the load balancer over HTTPS). More information on the config is here -- https://www.digitalocean.com/community/tutorials/how-to-configure-ssl-termination-on-digitalocean-load-balancers.

The cronjob automatically uploads the cert to the load balancer every time it is renewed. So there's no need for manual uploading vis-a-vis the cloc-servers.

However, with respect to the client-web application, the cert renewal process isn't automatic yet. The client-web files live in an s3 bucket, and are served to users via a cloudfront distribution. That distribution is configured to take the cert from AWS' Certificate Manager, which holds the cert. It's possible to use AWS' api to automate the uploads of certs to the Certificate Manager, but those scripts haven't been written yet. So the certs on the admin server need to be manually uploaded to the Certificate Manager on AWS.



