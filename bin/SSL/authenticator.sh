#!/bin/bash

echo "authenticating"
echo $CERTBOT_DOMAIN
echo $CERTBOT_VALIDATION

node ../scripts/createChallengeRecord --validation $CERTBOT_VALIDATION
sleep 10