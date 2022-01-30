// eslint-disable-next-line  import/prefer-default-export
export const getStorybookUrl = () =>
  process.env.AUTOMATED_STORYBOOK_URL || 'http://localhost:3144';
