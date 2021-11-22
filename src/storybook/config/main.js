/*

    Storybook is super brittle – I’m having to do back-flips to make it work.
    Here are some notes:

    - Dynamic story support is being dropped for no reason.
      See https://github.com/ComponentDriven/csf/issues/26

    - console is blown away so no debugging

  */

const fs = require('fs');
const glob = require('glob');
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

  return glob.sync(
    path.join(
      __dirname,
      `../../../../../../**/__automated__/index.stories.tsx`,
    ),
  );
}

// const resolveModulesPath = (_path) =>
//   path.join(__dirname, '../../../node_modules', _path);

const resolveModulesPath = (_path) => {
  const localModules = path.join(__dirname, '../../../node_modules', _path);
  const topLevelModules = path.join(
    __dirname,
    '../../../../../../node_modules',
    _path,
  );

  return fs.existsSync(localModules) ? localModules : topLevelModules;
};

const out = {
  stories: async (list) => [...list, ...findStories()],

  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  webpackFinal: (config) => {
    const out = {
      ...config,

      node: {
        ...config.node,

        __dirname: true,
      },

      module: {
        ...config.module,

        rules: [
          ...config.module.rules,

          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },

          {
            test: /\.(ts|tsx)$/,
            loader: resolveModulesPath('babel-loader'),
            options: {
              presets: [resolveModulesPath('@emotion/babel-preset-css-prop')],
            },
          },
        ],
      },
    };

    return out;
  },
};

module.exports = out;
