#!/bin/bash

sudo certbot certonly --manual \
  --preferred-challenges dns \
  --manual-auth-hook ./createChallengeRecord.js \
  --manual-cleanup-hook ./deleteChallengeRecord.js \
  --domain api.codeflower.la \
  #--dry-run
