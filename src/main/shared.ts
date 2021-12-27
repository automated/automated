import path from 'path';

export const deriveModule = (module: string) =>
  require(deriveModulePath(module));

export const deriveModulePath = (module: string) =>
  process.env.IS_DOCKER
    ? path.join(`/home/circleci/project/node_modules/`, module)
    : module;
