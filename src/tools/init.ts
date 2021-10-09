import { writeFileSync, copySync, rmSync, readdirSync } from 'fs-extra';
import { existsSync } from 'fs';
import glob from 'glob';
import path from 'path';
import asyncLoop from '../utils/async-loop';

const fileName = '__automated';
const templateFolderName = '__automated__';

const testFiles = glob.sync(`**/${fileName}.*`);
const templatePath = path.join(__dirname, '../template');
const projectRoot = path.join(__dirname, '../../../');

const libMeta = require(path.join(templatePath, 'index.json'));

const templateContentsFileNames = readdirSync(templatePath);

asyncLoop(testFiles, (file: string) => {
  const relativeComponentDir = file.substr(0, file.indexOf(fileName));
  const componentDir = path.join(projectRoot, relativeComponentDir);
  const automatedDir = path.join(componentDir, templateFolderName);
  const readMe = path.join(automatedDir, 'README.md');
  const config = path.join(automatedDir, 'index.json');

  if (!existsSync(readMe) || require(config).version >= libMeta.version) {
    templateContentsFileNames.forEach((file) => {
      rmSync(path.join(automatedDir, file));
    });
  }

  copySync(templatePath, automatedDir);
  writeFileSync(
    path.join(automatedDir, '/.gitignore'),
    ['index.stories.tsx', 'index.test.tsx', 'README.md'].join('\n'),
  );
});
