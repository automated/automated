import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

import packageJson from '../main/package.json';
import aptDeps from './apt-deps';

const dockerfileDirPath = path.join(__dirname, '../../dist');

const dockerfileFilePath = path.join(dockerfileDirPath, 'Dockerfile');

const content = [
  '# THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.',
  '\n\n',
  'FROM cimg/node:14.17.5',
  '\n\n',
  'RUN sudo apt-get update',
  '\n\n',
  `RUN sudo apt-get install ${aptDeps.join(' ')}`,
  '\n\n',
  `RUN yarn add ${Object.entries(packageJson.dependencies)
    .map(([lib, version]) => `${lib}@${version}`)
    .join(' ')}`,
  '\n\n',
  'COPY main /home/circleci/project ',
  '\n\n',
  'ENV IS_DOCKER=true',
  '\n\n',
  'EXPOSE 3144',
  // '\n\n',
  // 'CMD ["/bin/sh"]',
].join('');

execSync(`mkdir -p ${dockerfileDirPath}`);

fs.writeFileSync(dockerfileFilePath, content);
