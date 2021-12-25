const base = ({ dirname }: { dirname: string }): string => {
  const absPrefix = __dirname.substr(0, __dirname.indexOf('node_modules') - 1);
  if (__dirname) return dirname.replace(absPrefix, '');

  return dirname;
};

export default base;
