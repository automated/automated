const lint = "eslint --ignore-path .gitignore --ext .jsx,.js,.ts,.tsx '.'";

const build = ['tsc', 'cp -r ./src/cli ./dist/cli'].join(' && ');

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
