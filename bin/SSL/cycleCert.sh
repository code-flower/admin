#!/bin/bash

certbot renew --manual \
  --preferred-challenges dns \
  --manual-auth-hook ./authenticator.sh \
  --manual-cleanup-hook ./cleanup.sh \
  --post-hook ./syncAndReload.sh \
  #--force-renewal \
  #--dry-run