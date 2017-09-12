

## Installation

1. install git

```
sudo apt-get update
sudo apt-get install git
```

2. install node 8.4.0 and npm

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

## Actions

### Droplets

1. create a droplet, copy an SSL cert to it, start the server with pm2, and save the processes

2. delete a droplet without dropping any connections

### SSL Certs

1. generate a cert: `cd bin; ./createCert.sh`

2. sync the cert with all running 'cloc-server' droplets, and then initiate a cautious reload on each: `cd bin; ./syncAndReload.sh`

3. attempt to renew the cert, and if it renews (because it's close to the expiration date), sync it with all 'cloc-server' droplets, and initiate cautious reload on each: `cd bin; ./cycleCert.sh`

### Monitoring

1. open an iTerm tab for each running 'cloc-server' droplet and run `pm2 monit` in that window

2. open an iTerm tab for each running 'cloc-server' droplet and run the connection monitor in that window

3. health check -- runs a health check on all running 'cloc-server' droplets

### Logs

1. view logs for all running droplets for the last -d days

