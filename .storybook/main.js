const path = require('path');

function findStories() {
  const file = __dirname + '/../example/src/components/button/index.test.tsx';
  console.log(file);
  return [file];
}

const resolveModulesPath = (_path) =>
  path.join(process.cwd(), 'node_modules', _path);

const out = {
  stories: async (list) => [...list, ...findStories()],

  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],

  webpackFinal: (config) => ({
    ...config,

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
