import { exec, execSync } from 'child_process';
import path from 'path';

import spawn from '../main/utils/spawn';
import waitFor from '../main/utils/wait-for';

const meta = require('../meta.json');

const isDev = process.env.AUTOMATED_DEVELOPMENT;

const dockerImage = isDev
  ? 'automated_image_development'
  : `kirkstrobeck/automated:${meta.version}`;

const dockerName = isDev
  ? 'automated_dockerfile_development'
  : 'automated_dockerfile';

const healthCheck = () => {
  try {
    execSync(`docker exec ${dockerName} echo`);

    return true;
  } catch (error) {
    // NOP
  }

  return false;
};

const nodeModulesForHost = '/home/circleci/project/node_modules-for-host';

const copyModule = async (module: string) => {
  console.log(`Copying \`${module}\` from AUTOMATED to \`./node_modules\``);

  const copyTo = path.join(nodeModulesForHost, module);

  return exec(
    [
      `docker exec ${dockerName}`,
      `rsync -av /home/circleci/project/node_modules/${module}/. ${copyTo}`,
    ].join(' '),
  );
};

(async () => {
  if (process.env.AUTOMATED_DOCKER_FORCE_RESET || !healthCheck()) {
    // eslint-disable-next-line no-console
    console.log('Trying to start Automated Docker');

    const projectDir = execSync('echo "$(pwd)"').toString().trim();

    execSync(`docker rm -f ${dockerName}`);

    await spawn([
      'docker run -di',
      '--env HOST_PWD=`pwd`',
      `--name ${dockerName}`,
      '--publish 3144:3144',
      `--mount type=bind,source=${path.join(
        projectDir,
        'node_modules',
      )},target=/home/circleci/project/node_modules-for-host`,
      '--volume `pwd`:`pwd`',
      `--workdir \`pwd\` ${dockerImage}`,
    ]);

    await waitFor(healthCheck);

    execSync(
      [`docker exec ${dockerName}`, `mkdir -p ${nodeModulesForHost}`].join(' '),
    );

    await Promise.all([
      copyModule('@storybook'),
      copyModule('ansi-to-html'),
      copyModule('core-js'),
      copyModule('entities'),
      copyModule('global'),
      copyModule('lodash'),
      copyModule('qs'),
      copyModule('ts-dedent'),
      copyModule('util-deprecate'),
    ]);

    execSync([`docker exec ${dockerName}`, 'sudo chmod -R 777 /var'].join(' '));
  }

  await spawn([
    'docker exec -it',
    Object.entries(process.env)
      .map(([key, value]) => `--env ${key}="${value}"`)
      .join(' '),
    dockerName,
    'node /home/circleci/project/index.js',

    ...process.argv.slice(2),
  ]);
})();
