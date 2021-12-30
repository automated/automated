import path from 'path';

export const deriveModule = async (module: string) =>
  // eslint-disable-next-line global-require, import/no-dynamic-require
  import(deriveModulePath(module));

export const deriveModulePath = (module: string) => {
  if (process.env.IS_DOCKER || process.env.STORYBOOK_IS_DOCKER) {
    console.log(path.join('/home/circleci/project/node_modules', module));
    return path.join('/home/circleci/project/node_modules', module);
  }

  return module;
};
