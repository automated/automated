import { writeFileSync, copySync, rmSync, readdirSync } from 'fs-extra';
import { existsSync } from 'fs';
import glob from 'glob';
import path from 'path';
import asyncLoop from '../utils/async-loop';

const fileName = '__automated';
const templateFolderName = '__automated__';

const testFiles = glob.sync(`**/${fileName}.*`);
const libTemplateDir = path.join(__dirname, '../template');
const projectRootDir = path.join(__dirname, '../../../');

const libMeta = require(path.join(libTemplateDir, 'index.json'));
const libVersion = libMeta.version;

asyncLoop(testFiles, (file: string) => {
  const relativeComponentDir = file.substr(0, file.indexOf(fileName));
  const componentDir = path.join(projectRootDir, relativeComponentDir);
  const automatedDir = path.join(componentDir, templateFolderName);
  const readMe = path.join(automatedDir, 'README.md');
  const config = path.join(automatedDir, 'index.json');

  if (!existsSync(readMe) || libVersion > require(config).version) {
    readdirSync(automatedDir).forEach((file) => {
      if (file !== 'foo') {
        console.log(
          `path.join(automatedDir, file)`,
          path.join(automatedDir, file),
        );
        rmSync(path.join(automatedDir, file));
      }
    });
  }

  copySync(libTemplateDir, automatedDir);

  writeFileSync(
    path.join(automatedDir, '/.gitignore'),
    ['index.stories.tsx', 'index.test.tsx', 'README.md'].join('\n'),
  );
});
