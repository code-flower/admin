

### Installation

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

3. install letsencrypt cert

sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot

# old method
certbot certonly --standalone -d api.codeflower.la

# new method
certbot certonly --manual --preferred-challenges dns -d api.codeflower.la