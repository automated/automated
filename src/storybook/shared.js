module.exports = {
  getStorybookUrl: () =>
    process.env.AUTOMATED_STORYBOOK_URL || 'http://localhost:3144',
};
