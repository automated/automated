// import fetch from 'cross-fetch';
// import fs from 'fs';
import { execSync, spawnSync } from 'child_process';
import path from 'path';
// const shared = require('../storybook/shared');

export type { Props, UseCase, UseCases } from './types';

const projectDir = execSync('echo "$(pwd)"').toString().trim();

// eslint-disable-next-line import/prefer-default-export
export const automatedDir = '/home/circleci/project';
const automatedBins = path.join(automatedDir, 'node_modules/.bin');

const argv = process.argv.slice(2);

// console.log('argv', argv);
// console.log('projectDir', projectDir);
// console.log('automatedDir', automatedDir);

const automatedTitle = '[ Automated ⚙️ ]';

(async () => {
  if (argv[0] === 'init') {
    // eslint-disable-next-line no-console
    console.log(`${automatedTitle}: Init`);
    spawnSync('node', [`${automatedDir}/init/index.js`], {
      shell: true,
      stdio: 'inherit',
    });

    return;
  }

  if (argv[0] === 'jest') {
    // eslint-disable-next-line no-console
    console.log(`${automatedTitle}: Jest`);

    // process.env.JEST_IMAGE_SNAPSHOT_TRACK_OBSOLETE = 'true';

    // try {
    //   if ((await fetch(shared.getStorybookUrl())).ok) {
    //     process.env.AUTOMATED_STORYBOOK_IS_RUNNING = 'true';
    //   }
    // } catch (error) {}

    spawnSync(
      'node',
      [
        `${automatedBins}/jest`,
        `--rootDir="${projectDir}"`,
        `--config="${automatedDir}/jest/jest.config.js"`,

        ...process.argv.slice(3),
      ],
      {
        shell: true,
        stdio: 'inherit',
      },
    );
  }
})();

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
//         `--output-dir="${projectDir}/tmp/automated/storybook"`,

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
//         `--out="${projectDir}/coverage-combined/coverage-final.json"`,
//         `${projectDir}/coverage/coverage-final.json`,
//         `${projectDir}/tmp/automated/coverage/coverage-final.json`,
//         '&&',
//         deriveBinary({
//           bin: 'istanbul',
//         }),
//         `--include="${projectDir}/coverage-combined/coverage-final.json"`,
//         `--dir="${projectDir}/coverage-combined/lcov-report"`,
//         `html`,
//       ],
//       {
//         shell: true,
//         stdio: 'inherit',
//       },
//     );

//     return;
//   }

// const projectBinDir = `${projectDir}/node_modules/.bin`;
// const automatedBinDir = `${automatedDir}/node_modules/.bin`;
// const automatedDistDir = `${automatedDir}/dist`;
// const deriveBinary = ({ bin }: { bin: string }) => {
//   if (fs.statSync(`${automatedBinDir}/${bin}`)) {
//     return `${automatedBinDir}/${bin}`;
//   }

//   return `${projectBinDir}/${bin}`;
// };
