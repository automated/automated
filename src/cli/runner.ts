import { execSync, spawnSync } from 'child_process';
import path from 'path';

const argv = process.argv.slice(2);

const pwd = execSync('echo "$(pwd)"').toString().trim();
const projectRootDir = path.join();

// console.log(pwd, __dirname);

const automatedRootDir = `${projectRootDir}/node_modules/@automated/automated`;
// const projectBinDir = `${projectRootDir}/node_modules/.bin`;

// const automatedBinDir = `${automatedRootDir}/node_modules/.bin`;
// const automatedDistDir = `${automatedRootDir}/dist`;

const automatedTitle = '[ Automated ⚙️ ]';
console.log(automatedTitle);

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
  ],
  {
    shell: true,
    stdio: 'inherit',
  },
);

// (async () => {
//   if (argv[0] === 'init') {
//     console.log(`${automatedTitle}: Init`);

//     spawnSync('node', [`${automatedRootDir}/dist/tools/init.js`], {
//       shell: true,
//       stdio: 'inherit',
//     });

//     return;
//   }
// })();
