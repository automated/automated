import { execSync } from 'child_process';
import { copySync, pathExistsSync, readdirSync, rmSync } from 'fs-extra';
import glob from 'glob';
import path from 'path';

import asyncLoop from '../utils/async-loop';

const fileName = '__automated';
const templateDirName = '__automated__';

const absLibTemplateDir = '/home/circleci/project/template';

const absProjectRootDir = execSync('echo "$(pwd)"').toString().trim();

const absProjectTestFiles = glob.sync(`${absProjectRootDir}/**/${fileName}.*`);

// eslint-disable-next-line import/no-dynamic-require, global-require
const libMeta = require(path.join(absLibTemplateDir, 'index.json'));
const libVersion = libMeta.version;

asyncLoop(absProjectTestFiles, (file: string) => {
  const absComponentDir = file.substr(0, file.indexOf(fileName));
  const absAutomatedDir = path.join(absComponentDir, templateDirName);
  const absReadMe = path.join(absAutomatedDir, 'README.md');
  const absConfig = path.join(absAutomatedDir, 'index.json');

  if (
    pathExistsSync(absAutomatedDir) &&
    // eslint-disable-next-line import/no-dynamic-require, global-require
    (!pathExistsSync(absReadMe) || libVersion > require(absConfig).version)
  ) {
    readdirSync(absAutomatedDir).forEach((fileLocal) => {
      if (
        fileLocal !== '__image_snapshots__' &&
        fileLocal !== '__snapshots__'
      ) {
        rmSync(path.join(absAutomatedDir, fileLocal));
      }
    });
  }

  copySync(absLibTemplateDir, absAutomatedDir, {
    overwrite: true,
  });

  // writeFileSync(
  //   path.join(absAutomatedDir, '/.gitignore'),
  //   ['index.stories.tsx', 'index.test.tsx', 'README.md'].join('\n'),
  // );
});
