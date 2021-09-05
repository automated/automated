const path = require('path');

function findStories() {
  // console.log('IS_STORYBOOK', !!process.env.IS_STORYBOOK);
  // console.log('IS_JEST', !!process.env.IS_JEST);
  console.log(process.env);

  // process.env.STORYBOOK_FOO = 'blamo';

  // env’s must be prefixed with `STORYBOOK_` otherwise they’re just blown away.
  // why storybook .. just, why
  Object.entries(process.env).forEach(([key, value]) => {
    process.env[`STORYBOOK_${key}`] = value;
  });

  console.log('sdfsdf');
  console.log(process.env);

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

    // target: 'node',
    // node: false,

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
