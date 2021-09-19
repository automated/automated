/*

    Storybook is super brittle – I’m having to do back-flips to make it work.
    Here are some notes:

    - Dynamic story support is being dropped for no reason.
      See https://github.com/ComponentDriven/csf/issues/26

    - console is blown away so no debugging

  */

const path = require('path');
const { DefinePlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');

function findStories() {
  /*

  env’s must be prefixed with `STORYBOOK_` otherwise they’re just blown away.
  why storybook .. just, why

  */
  Object.entries(process.env).forEach(([key, value]) => {
    process.env[`STORYBOOK_${key}`] = value;
  });

  return [
    path.join(__dirname, '/../example/src/components/button/index.stories.tsx'),
    path.join(
      __dirname,
      '/../example/src/components/warning/index.stories.tsx',
    ),
  ];
}

const resolveModulesPath = (_path) =>
  path.join(process.cwd(), 'node_modules', _path);

const out = {
  stories: async (list) => [...list, ...findStories()],

  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  webpackFinal: (config) => {
    const out = {
      ...config,

      node: {
        __dirname: true,

        child_process: 'empty',
      },

      module: {
        ...config.module,

        rules: [
          ...config.module.rules,

          {
            test: /\.(ts|tsx)$/,
            loader: resolveModulesPath('babel-loader'),
            options: {
              presets: [resolveModulesPath('@emotion/babel-preset-css-prop')],
            },
          },

          // {
          //   test: /node_modules/,
          //   use: { loader: 'umdCompatLoader' },
          // },
        ],
      },

      plugins: [
        ...config.plugins,
        // new IgnorePlugin({
        //   checkResource(resource) {
        //     console.log(resource);
        //     // do something with resource
        //     return true;
        //   },
        // }),

        new DefinePlugin({
          __IS_STORYBOOK__: JSON.stringify(
            !!process.env.STORYBOOK_IS_STORYBOOK,
          ),
        }),
      ],

      // resolveLoader: {
      //   ...config.resolveLoader,
      //   modules: [path.join(__dirname, 'node_modules')],
      // },

      // externals: [
      //   nodeExternals({
      //     modulesFromFile: true,
      //   }),
      // ],
      // externals: [
      //   // Every non-relative module is external
      //   // abc -> require("abc")
      //   /^[a-z\-0-9]+$/,
      // ],

      // // target: 'node',

      // resolve: {
      //   ...config.resolve,

      //   // symlinks: false,

      //   // extensions: ['*'],

      //   // modules: [path.join(__dirname, 'node_modules')],
      // },
    };

    // console.log(JSON.stringify(out, null, 2));

    return out;
  },
};

module.exports = out;
