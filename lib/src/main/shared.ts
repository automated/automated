import path from 'path';

type Options = {
  isFromHost?: boolean;
};

export const deriveModule = (module: string, options?: Options) =>
  // eslint-disable-next-line global-require, import/no-dynamic-require
  require(deriveModulePath(module, options));

export const deriveModulePath = (
  module: string,
  { isFromHost }: Options = {},
) => {
  const isDocker = process.env.IS_DOCKER || process.env.STORYBOOK_IS_DOCKER;

  if (isDocker && isFromHost) {
    return path.join('./node_modules/@automated/docker/node_modules', module);
  }

  if (isDocker) {
    return path.join('/home/circleci/project/node_modules', module);
  }

  return module;
};
