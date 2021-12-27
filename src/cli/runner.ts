import { execSync, spawnSync } from 'child_process';
import waitFor from '../main/utils/wait-for';

const command = () => {
  try {
    const spawn = spawnSync(
      'docker',
      [
        'exec -it',
        'automated_dockerfile',
        'node /home/circleci/project/index.js',

        ...process.argv.slice(2),
      ],
      {
        shell: true,
        stdio: 'inherit',
      },
    );

    if (!spawn.status) return true;
  } catch (error) {}

  return false;
};

(async () => {
  if (process.env.AUTOMATED_DOCKER_FORCE_RESET || !command()) {
    console.log('Trying to start Automated docker container');

    execSync('docker rm -f automated_dockerfile');

    spawnSync(
      'docker',
      [
        'run -di',
        '--env HOST_PWD=`pwd`',
        '--name automated_dockerfile',
        '--publish-all',
        '--volume `pwd`:`pwd`',
        '--workdir `pwd` automated',
      ],
      {
        shell: true,
        stdio: 'ignore',
      },
    );

    await waitFor(command);
  }
})();
