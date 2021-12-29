import path from 'path';

export const deriveModule = (module: string) =>
  // eslint-disable-next-line global-require, import/no-dynamic-require
  require(deriveModulePath(module));

export const deriveModulePath = (module: string) => {
  if (process.env.IS_DOCKER) {
    return path.join('/home/circleci/project/node_modules/', module);
  }

  return module;
};
