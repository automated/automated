import {
  copySync,
  pathExistsSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'fs-extra';
import glob from 'glob';
import path from 'path';
import asyncLoop from '../utils/async-loop';

const fileName = '__automated';
const templateDirName = '__automated__';

const absLibTemplateDir = path.join(__dirname, '../template');

const absProjectRootDir = path.join(__dirname, '../../../../../');
const absProjectTestFiles = glob.sync(`${absProjectRootDir}/**/${fileName}.*`);

const libMeta = require(path.join(absLibTemplateDir, 'index.json'));
const libVersion = libMeta.version;

asyncLoop(absProjectTestFiles, (file: string) => {
  const absComponentDir = file.substr(0, file.indexOf(fileName));
  const absAutomatedDir = path.join(absComponentDir, templateDirName);
  const absReadMe = path.join(absAutomatedDir, 'README.md');
  const absConfig = path.join(absAutomatedDir, 'index.json');

  if (
    pathExistsSync(absAutomatedDir) &&
    (!pathExistsSync(absReadMe) || libVersion > require(absConfig).version)
  ) {
    readdirSync(absAutomatedDir).forEach((file) => {
      if (file !== 'foo') {
        rmSync(path.join(absAutomatedDir, file));
      }
    });
  }

  copySync(absLibTemplateDir, absAutomatedDir, {
    overwrite: true,
  });

  writeFileSync(
    path.join(absAutomatedDir, '/.gitignore'),
    ['index.stories.tsx', 'index.test.tsx', 'README.md'].join('\n'),
  );
});
