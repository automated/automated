// import fetch from 'cross-fetch';
// import fs from 'fs';
import { execSync, spawnSync } from 'child_process';
// const shared = require('../storybook/shared');

// const projectRootDir = execSync('echo "$(pwd)"').toString().trim();

const automatedRootDir = `/home/circleci/project`;

const argv = process.argv.slice(2);

// console.log('argv', argv);
// console.log('projectRootDir', projectRootDir);
// console.log('automatedRootDir', automatedRootDir);

const automatedTitle = '[ Automated ⚙️ ]';

(async () => {
  if (argv[0] === 'init') {
    console.log(`${automatedTitle}: Init`);
    spawnSync('node', [`${automatedRootDir}/tools/init.js`], {
      shell: true,
      stdio: 'inherit',
    });

    return;
  }
})();

//   if (argv[0] === 'jest') {
//     console.log(`${automatedTitle}: Jest`);

//     process.env.JEST_IMAGE_SNAPSHOT_TRACK_OBSOLETE = 'true';

//     try {
//       if ((await fetch(shared.getStorybookUrl())).ok) {
//         process.env.AUTOMATED_STORYBOOK_IS_RUNNING = 'true';
//       }
//     } catch (error) {}

//     spawnSync(
//       deriveBinary({
//         bin: 'jest',
//       }),
//       [
//         `--rootDir="${projectRootDir}"`,
//         `--config="${automatedDistDir}/jest/jest.config.js"`,

//         ...process.argv.slice(3),
//       ],
//       {
//         shell: true,
//         stdio: 'inherit',
//       },
//     );

//     return;
//   }

//   if (argv[0] === 'hello') {
//     console.log(`${automatedTitle}: Testing docker`);

//     execSync('docker exec -it automated /bin/sh');

//     return;
//   }

//   if (argv[0] === 'storybook') {
//     console.log(`${automatedTitle}: Storybook`);

//     spawnSync(
//       deriveBinary({
//         bin: 'start-storybook',
//       }),
//       [
//         `--config-dir="${automatedDistDir}/storybook/config"`,
//         `--port="3144"`,

//         ...process.argv.slice(3),
//       ],
//       {
//         shell: true,
//         stdio: 'inherit',
//       },
//     );

//     return;
//   }

//   if (argv[0] === 'storybook-build') {
//     console.log(`${automatedTitle}: Storybook: Build`);
//     spawnSync(
//       deriveBinary({
//         bin: 'build-storybook',
//       }),
//       [
//         `--config-dir="${automatedDistDir}/storybook/config"`,
//         `--output-dir="${projectRootDir}/tmp/automated/storybook"`,

//         ...process.argv.slice(3),
//       ],
//       {
//         shell: true,
//         stdio: 'inherit',
//       },
//     );

//     return;
//   }

//   if (argv[0] === 'combine-coverage') {
//     console.log(`${automatedTitle}: Combine coverage`);
//     spawnSync(
//       deriveBinary({
//         bin: 'istanbul-merge',
//       }),
//       [
//         `--out="${projectRootDir}/coverage-combined/coverage-final.json"`,
//         `${projectRootDir}/coverage/coverage-final.json`,
//         `${projectRootDir}/tmp/automated/coverage/coverage-final.json`,
//         '&&',
//         deriveBinary({
//           bin: 'istanbul',
//         }),
//         `--include="${projectRootDir}/coverage-combined/coverage-final.json"`,
//         `--dir="${projectRootDir}/coverage-combined/lcov-report"`,
//         `html`,
//       ],
//       {
//         shell: true,
//         stdio: 'inherit',
//       },
//     );

//     return;
//   }

// const projectBinDir = `${projectRootDir}/node_modules/.bin`;
// const automatedBinDir = `${automatedRootDir}/node_modules/.bin`;
// const automatedDistDir = `${automatedRootDir}/dist`;
// const deriveBinary = ({ bin }: { bin: string }) => {
//   if (fs.statSync(`${automatedBinDir}/${bin}`)) {
//     return `${automatedBinDir}/${bin}`;
//   }

//   return `${projectBinDir}/${bin}`;
// };
