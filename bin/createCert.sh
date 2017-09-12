#!/bin/bash

certbot certonly --manual \
  --preferred-challenges dns \
  --manual-auth-hook ./authenticator.sh \
  --manual-cleanup-hook ./cleanup.sh \
  --domain api.codeflower.la
  --dry-run