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
    `sed -i -e  's|"@automated/automated": "file:.yalc/@automated/automated",||g' example/package.json`,
    [
      '(',
      [
        'cd example',
        'yarn add yalc',
        'yalc add @automated/automated',
        'yarn',
        'yarn automated init',
      ].join(' && '),
      ')',
    ].join(''),
  ].join(' && '),

  'test-ci': '(cd example && yarn automated init)',
};

module.exports = { scripts };
