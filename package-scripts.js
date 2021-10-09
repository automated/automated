const lint = "eslint --ignore-path .gitignore --ext .jsx,.js,.ts,.tsx '.'";

const build = [
  'tsc',
  'cp ./src/cli/index.sh ./dist/automated.sh',
  'cp -r ./src/template ./dist/template',
  'cp ./src/types.d.ts ./dist',
].join(' && ');

const yalcPublishToExample = [
  'yalc publish',
  [`(cd example`, '../node_modules/.bin/yalc add @automated/automated)'].join(
    ' && ',
  ),
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
};

module.exports = { scripts };
