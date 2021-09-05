const base = ({ dirname }: { dirname: string }): string => {
  // return 'foo222';
  // const pwd = String(process.env.STORYBOOK_PWD);
  // if (!pwd || pwd === 'undefined') {
  //   // throw new Error('Missing `process.env.PWD`');
  // }
  // return process.env.STORYBOOK_FOO || 'fallback';
  return dirname;
  // dirname.replace(pwd, '');

  // const initCwd = String(theirProcess.env.INIT_CWD);
  // if (!initCwd || initCwd === 'undefined') {
  //   // throw new Error('Missing `process.env.INIT_CWD`');
  // }
  // const describeName = filename.replace(initCwd, '');
};

export default base;
