const lintPrefix = 'eslint --ignore-path .gitignore --ext .jsx,.js,.ts,.tsx';

const build = [
  'rm -rf ./lib/dist/*',

  'tsc',

  'cp -r ./lib/src/main/storybook/config ./lib/dist/main/storybook/config',
  'cp -r ./lib/src/main/template ./lib/dist/main/template',
  'cp ./lib/src/cli/automated.sh ./lib/dist/cli/automated.sh',
  'cp ./lib/src/main/types.d.ts ./lib/dist/main',

  //   'cp ./lib/src/automated.sh ./lib/dist',
  //   'cp ./lib/src/storybook/shared.js ./lib/dist/storybook/shared.js',

  'yarn ts-node ./lib/src/docker-generator/index.ts',

  '(cd ./lib/dist && docker build --tag=automated:latest .)',
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

const scripts = {
  build,

  dev,

  format: `${lintPrefix} --fix '.'`,

  lint: `${lintPrefix} '.'`,

  // test: '(cd example && yarn automated init)',
  test: '(cd example && yarn automated jest --testPathPattern src -u --coverage)',
};

module.exports = { scripts };

// const shared = require('./lib/src/storybook/shared');

// const build = [
//   'rm -rf ./lib/dist',

//   'tsc',

//   'cp -r ./lib/src/cli ./lib/dist/cli',
//   'cp -r ./lib/src/storybook/config ./lib/dist/storybook/config',
//   'cp -r ./lib/src/template ./lib/dist/template',
//   'cp ./lib/src/automated.sh ./lib/dist',
//   'cp ./lib/src/storybook/shared.js ./lib/dist/storybook/shared.js',
//   'cp ./lib/src/types.d.ts ./lib/dist',
// ].join(' && ');

// const dev = [
//   `yarn nodemon`,
//   [
//     "--ext '*'",
//     `--watch "tsconfig.json"`,
//     `--watch "package.json"`,
//     `--watch "src/**/*"`,
//     `--exec "${build} && ${yalcPublishToExample}"`,
//   ].join(' '),
// ].join(' ');

// const scripts = {
//   'docker-run': [
//     'docker build --tag=automated:latest .',
//     'docker rm -f automated_dockerfile',
//     [
//       'docker run -it ',
//       '--env HOST_PWD=`pwd`',
//       '--publish-all',
//       '--name automated_dockerfile',
//       '--volume `pwd`:`pwd`',
//       '--workdir `pwd`',
//       'automated',
//     ].join(' '),
//   ].join(' && '),

//   build,

//   dev,

//   publish: '',

//   'install-example-deps': [
//     build,
//     'yalc publish',
//     'sh ./remove-automated-dep.sh',
//     [
//       '(',
//       [
//         'cd example',
//         'yarn add yalc',
//         'yalc add @automated/automated',
//         'yarn',
//       ].join(' && '),
//       ')',
//     ].join(''),
//   ].join(' && '),

//   'test-ci': [
//     `yarn wait-on ${shared.getStorybookUrl()} && (`,
//     [
//       'cd example',
//       [
//         `AUTOMATED_JEST_VISUAL_REGRESSION_REQUIRED=true`,
//         'yarn automated jest',

//         '--coverage',
//         '--testPathIgnorePatterns .yalc',
//       ].join(' '),
//       'yarn automated build-storybook',

//       // 'yarn automated init', // then compare git status
//     ].join(' && '),
//     ')',
//   ].join(''),
// };
