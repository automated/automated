import { copySync, rmSync, readdirSync } from 'fs-extra';
import { existsSync } from 'fs';
import glob from 'glob';
import path from 'path';
import asyncLoop from '../utils/async-loop';

const fileName = '__automated';
const templateFolderName = '__automated__';

const testFiles = glob.sync(`**/${fileName}.*`);
const templatePath = path.join(__dirname, '../template');

const libMeta = require(path.join(templatePath, 'index.json'));

const templateContentsFileNames = readdirSync(templatePath);

asyncLoop(testFiles, (file: string) => {
  const dir = file.substr(0, file.indexOf(fileName));
  const automatedFiles = path.join(dir, templateFolderName);

  if (existsSync(automatedFiles)) {
    const meta = require(path.join(
      __dirname,
      '../../',
      automatedFiles,
      'index.json',
    ));
    if (meta.version >= libMeta.version) return;

    templateContentsFileNames.forEach((file) => {
      rmSync(path.join(automatedFiles, file));
    });
  }

  copySync(templatePath, automatedFiles);
});
