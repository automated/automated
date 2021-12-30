/*

    Storybook is super brittle – I’m having to do back-flips to make it work.
    Here are some notes:

    - Dynamic story support is being dropped for no reason.
      See https://github.com/ComponentDriven/csf/issues/26

    - console is blown away, so no debugging

  */

const childProcess = require('child_process');

const fs = require('fs');
const glob = require('glob');
const path = require('path');
const { DefinePlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');

const projectDir = childProcess.execSync('echo "$(pwd)"').toString().trim();
const automatedDir = '/home/circleci/project';
const automatedModulesDir = path.join(automatedDir, 'node_modules');

function findStories() {
  /*

  env’s must be prefixed with `STORYBOOK_` otherwise they’re just blown away.
  why storybook .. just, why

  */
  Object.entries(process.env).forEach(([key, value]) => {
    process.env[`STORYBOOK_${key}`] = value;
  });

  return glob.sync(
    path.join(projectDir, '/**/__automated__/index.stories.tsx'),
  );
}

const out = {
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  stories: async (list) => [...list, ...findStories()],

  webpackFinal: (config) => ({
    ...config,

    module: {
      ...config.module,

      rules: [
        ...config.module.rules,

        {
          test: /\.scss$/,
          use: [
            path.join(automatedModulesDir, 'style-loader'),
            path.join(automatedModulesDir, 'css-loader'),
            path.join(automatedModulesDir, 'sass-loader'),
          ],
        },

        {
          loader: path.join(automatedModulesDir, 'babel-loader'),
          // options: {
          //   presets: [
          //     path.join(automatedModulesDir, '@emotion/babel-preset-css-prop'),
          //   ],
          // },
          test: /\.(ts|tsx)$/,
        },
      ],
    },

    node: {
      ...config.node,

      __dirname: true,
    },

    resolve: {
      ...config.resolve,

      alias: {
        ...config.resolve.alias,

        '@storybook/addon-essentials': path.join(
          automatedModulesDir,
          '@storybook/addon-essentials',
        ),
        '@storybook/addon-links': path.join(
          automatedModulesDir,
          '@storybook/addon-links',
        ),
        '@storybook/react': path.join(automatedModulesDir, '@storybook/react'),
      },
    },
  }),
};

module.exports = out;
