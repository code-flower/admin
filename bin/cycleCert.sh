#!/bin/bash

certbot renew --manual \
  --preferred-challenges dns \
  --manual-auth-hook ./authenticator.sh \
  --manual-cleanup-hook ./cleanup.sh \
  --domain api.codeflower.la
  --dry-run

node ../scripts/syncCerts
node ../scripts/cautiousReloads