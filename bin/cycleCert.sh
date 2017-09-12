#!/bin/bash

certbot certonly --manual --preferred-challenges dns -d api.codeflower.la
node scripts/syncCerts
node scripts/cautiousReloads