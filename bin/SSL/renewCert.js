#!/usr/bin/env node

//////////////////////// IMPORTS /////////////////////////

require('module-alias/register');

const exec = require('@lib/util/exec'),
      sendAlert = require('@lib/util/sendAlert');

////////////////////////// MAIN //////////////////////////

let cmd = 'sudo certbot renew --manual \
  --force-renewal \
  --preferred-challenges dns \
  --manual-auth-hook ./createChallengeRecord.js \
  --manual-cleanup-hook ./deleteChallengeRecord.js \
  --deploy-hook ./deployCertOnDO.js';

exec(cmd, (err, stdout, stderr) => {
  let msg = 'STDOUT<br/>' + stdout + '<br/><br/>STDERR<br/>' + stderr;
  sendAlert('codeflower: renewing cloc-server cert', msg);
});