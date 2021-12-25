const build = [
  'rm -rf ./dist',

  'tsc --project tsconfig.lib.json',

  'cp ./src/cli/automated.sh ./dist/cli/automated.sh',
  //   'cp -r ./src/storybook/config ./dist/storybook/config',
  //   'cp -r ./src/template ./dist/template',
  //   'cp ./src/automated.sh ./dist',
  //   'cp ./src/storybook/shared.js ./dist/storybook/shared.js',
  //   'cp ./src/types.d.ts ./dist',

  'yarn ts-node src/docker-generator/index.ts',

  '(cd dist && docker build --tag=automated:latest .)',
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
  `yarn nodemon`,
  [
    "--ext '*'",
    `--watch "src/**/*"`,
    `--exec "${build} && ${yalcPublishToExample}"`,
  ].join(' '),
].join(' ');

const scripts = {
  dev,

  test: '(cd example && yarn automated)',
};

module.exports = { scripts };

// const shared = require('./src/storybook/shared');

// const lint = "eslint --ignore-path .gitignore --ext .jsx,.js,.ts,.tsx '.'";

// const build = [
//   'rm -rf ./dist',

//   'tsc',

//   'cp -r ./src/cli ./dist/cli',
//   'cp -r ./src/storybook/config ./dist/storybook/config',
//   'cp -r ./src/template ./dist/template',
//   'cp ./src/automated.sh ./dist',
//   'cp ./src/storybook/shared.js ./dist/storybook/shared.js',
//   'cp ./src/types.d.ts ./dist',
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
