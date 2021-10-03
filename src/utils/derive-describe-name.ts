const base = ({ dirname }: { dirname: string }): string => {
  const pwd = process.env.PWD;
  if (pwd) return dirname.replace(pwd, '');

  return dirname;
};

export default base;
