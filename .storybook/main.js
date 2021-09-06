/*

    Storybook is super brittle – I’m having to do back-flips to make it work.
    Here are some notes:

    - Dynamic story support is being dropped for no reason.
      See https://github.com/ComponentDriven/csf/issues/26

    - console is blown away so no debugging

  */
const path = require('path');

function findStories() {
  /*

  env’s must be prefixed with `STORYBOOK_` otherwise they’re just blown away.
  why storybook .. just, why

  */
  Object.entries(process.env).forEach(([key, value]) => {
    process.env[`STORYBOOK_${key}`] = value;
  });

  return [
    path.join(__dirname, '/../example/src/components/button/index.test.tsx'),
    path.join(__dirname, '/../example/src/components/warning/index.test.tsx'),
  ];
}

const resolveModulesPath = (_path) =>
  path.join(process.cwd(), 'node_modules', _path);

const out = {
  stories: async (list) => [...list, ...findStories()],

  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  webpackFinal: (config) => ({
    ...config,

    node: {
      global: true,
      __filename: true,
      __dirname: true,
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
      ],
    },
  }),
};

module.exports = out;
