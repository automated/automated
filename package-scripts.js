const lint = "eslint --ignore-path .gitignore --ext .jsx,.js,.ts,.tsx '.'";

const build = [
  'rm -rf ./dist',

  'tsc',
  'cp -r ./src/storybook/config ./dist/storybook/config',
  'cp -r ./src/template ./dist/template',
  'cp ./src/cli/index.sh ./dist/automated.sh',
  'cp ./src/types.d.ts ./dist',
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
    `--watch "tsconfig.json"`,
    `--watch "package.json"`,
    `--watch "src/**/*"`,
    `--exec "${build} && ${yalcPublishToExample}"`,
  ].join(' '),
].join(' ');

const scripts = {
  build,

  dev,

  publish: '',

  'install-example-deps': [
    build,
    'yalc publish',
    'sh ./remove-automated-dep.sh',
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

  'test-ci': [
    '(',
    [
      'cd example',
      [
        'yarn automated jest',

        '--coverage',
        '--testPathIgnorePatterns .yalc',
        // '--updateSnapshot',

        '.',
      ].join(' '),
      'yarn automated build-storybook',

      // 'yarn automated init', // then compare git status
    ].join(' && '),
    ')',
  ].join(''),
};

module.exports = { scripts };
