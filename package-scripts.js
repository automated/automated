const packageJson = require('./package.json');

const lintPrefix = 'eslint --ignore-path .gitignore --ext .jsx,.js,.ts,.tsx';

const build = [
  'rm -rf ./lib/dist/*',

  'tsc',

  'cp -r ./lib/src/main/storybook/config ./lib/dist/main/storybook/config',
  'cp -r ./lib/src/main/template ./lib/dist/main/template',
  'cp -r ./lib/src/main/utils ./lib/dist/main/utils',
  'cp ./lib/src/cli/automated.sh ./lib/dist/cli/automated.sh',
  'cp ./lib/src/main/types.d.ts ./lib/dist/main',

  'yarn ts-node ./lib/src/docker-generator/index.ts',
  'yarn ts-node ./lib/src/meta-generator/index.ts',

  '(cd ./lib/dist && docker build --tag=automated_image_development:latest .)',
].join(' && ');

const yalcPublishToExample = [
  'yalc publish',
  [
    '(',
    ['cd example', 'yalc add @automated/automated', 'yarn'].join(' && '),
    ')',
  ].join(''),
].join(' && ');

const dev = [
  'yarn nodemon',
  [
    "--ext '*'",
    '--watch "lib/src/**/*"',
    `--exec "${build} && ${yalcPublishToExample}"`,
  ].join(' '),
].join(' ');

const dockerDetails = {
  development: {
    image: 'automated_development',
    version: 'latest',
  },
  production: {
    org: 'kirkstrobeck',
    repo: 'automated',
    version: packageJson.version,
  },
};

const dockerPathProduction = `${dockerDetails.production.org}/${dockerDetails.production.repo}:${dockerDetails.production.version}`;

const scripts = {
  build,

  dev,

  'docker-publish': [
    `docker tag ${dockerDetails.development.image}:${dockerDetails.development.version} ${dockerPathProduction}`,
    `docker push ${dockerPathProduction}`,
  ].join(' && '),

  format: `${lintPrefix} --fix '.'`,

  'install-example-deps': [
    build,
    'yalc publish',
    'sh ./src/remove-automated-dep.sh',
    [
      '(',
      [
        'cd example',
        'yarn add yalc',
        'yalc add @automated/automated',
        'yarn',
      ].join(' && '),
      ')',
    ].join(''),
  ].join(' && '),

  lint: `${lintPrefix} '.'`,

  'test-ci':
    'cd example && yarn automated jest --testPathPattern src --coverage --verbose',
};

module.exports = { scripts };
