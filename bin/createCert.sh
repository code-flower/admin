#!/bin/bash

certbot certonly --manual \
  --preferred-challenges dns \
  --manual-auth-hook ./authenticator.sh \
  --manual-cleanup-hook ./cleanup.sh \
  -d api.codeflower.la