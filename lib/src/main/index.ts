import { execSync } from 'child_process';
import fetch from 'cross-fetch';
import path from 'path';

import { getStorybookUrl } from './storybook/shared';
import spawn from './utils/spawn';

export const projectDir = execSync('echo "$(pwd)"').toString().trim();
export type { Props, UseCase, UseCases } from './types';

export const automatedDir = '/home/circleci/project';
const automatedBins = path.join(automatedDir, 'node_modules/.bin');

const argv = process.argv.slice(2);

const automatedTitle = '[ Automated ⚙️ ]';

(async () => {
  switch (argv[0]) {
    case 'init': {
      // eslint-disable-next-line no-console
      console.log(`${automatedTitle}: Init`);
      await spawn(['node', `${automatedDir}/init/index.js`]);

      break;
    }

    case 'jest': {
      // eslint-disable-next-line no-console
      console.log(`${automatedTitle}: Jest`);

      process.env.JEST_IMAGE_SNAPSHOT_TRACK_OBSOLETE = 'true';

      try {
        if ((await fetch(getStorybookUrl())).ok) {
          process.env.AUTOMATED_STORYBOOK_IS_RUNNING = 'true';
        }
      } catch (error) {
        // NOP
      }

      await spawn([
        `${automatedBins}/jest`,
        `--rootDir="${projectDir}"`,
        `--config="${automatedDir}/jest/jest.config.js"`,

        ...process.argv.slice(3),
      ]);

      break;
    }

    case 'storybook': {
      // eslint-disable-next-line no-console
      console.log(`${automatedTitle}: Storybook`);

      await spawn([
        `${automatedBins}/start-storybook`,
        `--config-dir="${automatedDir}/storybook/config"`,
        '--port="3144"',

        ...process.argv.slice(3),
      ]);

      break;
    }

    case 'storybook-build': {
      // eslint-disable-next-line no-console
      console.log(`${automatedTitle}: Storybook: Build`);

      await spawn([
        `${automatedBins}/build-storybook`,
        `--config-dir="${automatedDir}/storybook/config"`,
        `--output-dir="${projectDir}/tmp/automated/storybook"`,

        ...process.argv.slice(3),
      ]);

      break;
    }
  }
})();

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
