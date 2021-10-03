const lint = "eslint --ignore-path .gitignore --ext .jsx,.js,.ts,.tsx '.'";

const build = 'tsc';

const yalcPublishToExample = [
  'yalc publish',
  [`(cd example`, '../node_modules/.bin/yalc add @automated/automated)'].join(
    ' && ',
  ),
].join(' && ');

const yalcWatchAndPublish = `yarn nodemon --watch out --exec "${yalcPublishToExample}"`;

const dev = [
  `yarn nodemon`,
  [
    "--ext '*'",
    `--watch "tsconfig.json"`,
    `--watch "package.json"`,
    `--watch "src/**/*"`,
    // `--watch "webpack.config.ts"`,
    `--exec "${build} && ${yalcPublishToExample}"`,
  ].join(' '),
].join(' ');

const scripts = {
  dev,

  // yalcPublishBinToExample: [
  //   "yalc publish",
  //   [
  //     `(cd example`,
  //     "../node_modules/.bin/yalc add @automated/automated",
  //     "npm install)",
  //   ].join(" && "),
  // ].join(" && "),
};

module.exports = { scripts };

// N/A
// "bin": {
//   "automated": "./out/index.sh"
// },
