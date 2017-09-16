#!/bin/bash

sudo certbot renew --manual \
  --force-renewal \
  --preferred-challenges dns \
  --manual-auth-hook ./createChallengeRecord.js \
  --manual-cleanup-hook ./deleteChallengeRecord.js \
  --deploy-hook ./deployCertOnDO.js