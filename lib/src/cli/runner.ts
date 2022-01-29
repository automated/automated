import { execSync } from 'child_process';
import path from 'path';

import spawn from '../main/utils/spawn';
import waitFor from '../main/utils/wait-for';

const healthCheck = async () => {
  try {
    await spawn('docker exec automated_dockerfile echo', {
      isSilent: true,
    });

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

  return spawn(
    [
      'docker exec',
      'automated_dockerfile',
      `rsync -av /home/circleci/project/node_modules/${module}/. ${copyTo}`,
    ],
    {
      isSilent: true,
    },
  );
};

(async () => {
  if (process.env.AUTOMATED_DOCKER_FORCE_RESET || !(await healthCheck())) {
    // eslint-disable-next-line no-console
    console.log('Trying to start Automated docker container');

    const projectDir = execSync('echo "$(pwd)"').toString().trim();

    await spawn('docker rm -f automated_dockerfile', { isSilent: true });

    await spawn(
      [
        'docker run -di',
        '--env HOST_PWD=`pwd`',
        '--name automated_dockerfile',
        '--publish 3144:3144',
        `--mount type=bind,source=${path.join(
          projectDir,
          'node_modules',
        )},target=/home/circleci/project/node_modules-for-host`,
        '--volume `pwd`:`pwd`',
        '--workdir `pwd` automated',
      ],
      {
        isSilent: true,
      },
    );

    await waitFor(healthCheck);

    await spawn([
      'docker exec',
      'automated_dockerfile',
      `mkdir -p ${nodeModulesForHost}`,
    ]);

    await Promise.all([
      copyModule('@storybook'),
      copyModule('ansi-to-html'),
      copyModule('core-js'),
      copyModule('entities'),
      copyModule('global'),
      copyModule('lodash'),
      copyModule('qs'),
      copyModule('ts-dedent'),
    ]);

    await spawn('docker exec automated_dockerfile sudo chmod -R 777 /var');
  }

  await spawn([
    'docker exec -it',
    Object.entries(process.env)
      .map(([key, value]) => `--env ${key}="${value}"`)
      .join(' '),
    'automated_dockerfile',
    'node /home/circleci/project/index.js',

    ...process.argv.slice(2),
  ]);
})();
