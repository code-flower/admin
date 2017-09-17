#!/bin/bash

sudo certbot certonly --manual \
  --preferred-challenges dns \
  --manual-auth-hook ./createChallengeRecord.js \
  --manual-cleanup-hook ./deleteChallengeRecord.js \
  --domain codeflower.la \
  --domain api.codeflower.la \
  --domain admin.codeflower.la \
  --dry-run

