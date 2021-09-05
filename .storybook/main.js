const path = require('path');

function findStories() {
  // console.log('IS_STORYBOOK', !!process.env.IS_STORYBOOK);
  // console.log('IS_JEST', !!process.env.IS_JEST);
  // console.log(process.env);

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
