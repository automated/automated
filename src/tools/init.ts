import { copySync } from 'fs-extra';
import { existsSync } from 'fs';
import glob from 'glob';
import path from 'path';
import asyncLoop from '../utils/async-loop';

const fileName = '__automated';
const templateFolderName = '__automated__';

const testFiles = glob.sync(`**/${fileName}.*`);

asyncLoop(testFiles, (file: string) => {
  const dir = file.substr(0, file.indexOf(fileName));

  if (existsSync(path.join(dir, templateFolderName))) return;

  copySync(
    path.join(__dirname, '../template'),
    path.join(dir, templateFolderName),
  );
});
