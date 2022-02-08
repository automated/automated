import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import packageJson from '../../../package.json';

const dirPath = path.join(__dirname, '../../dist');

const filePath = path.join(dirPath, 'meta.json');

execSync(`mkdir -p ${dirPath}`);

fs.writeFileSync(
  filePath,
  JSON.stringify(
    {
      version: packageJson.version,
    },
    undefined,
    2,
  ),
  'utf8',
);
