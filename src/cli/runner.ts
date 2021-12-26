import { execSync, spawnSync } from 'child_process';

execSync('docker rm -f automated_dockerfile');

spawnSync(
  'docker',
  [
    'run -it',
    '--env HOST_PWD=`pwd`',
    '--name automated_dockerfile',
    '--publish-all',
    '--volume `pwd`:`pwd`',
    '--workdir `pwd` automated',
    'node /home/circleci/project/index.js',

    ...process.argv.slice(2),
  ],
  {
    shell: true,
    stdio: 'inherit',
  },
);
