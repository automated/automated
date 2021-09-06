import React from 'react';
import { UseCase, UseCases } from './types';
// import jestRunner from './jest';
import storybookRunner from './storybook';
import deriveDescribeName from './utils/derive-describe-name';

export * from './types';

const defaultUseCase: UseCase = {};
const defaultUseCases: UseCases = { default: defaultUseCase };

export const runner = ({
  dirname,
  Component,
  useCases: useCasesProp,
}: {
  dirname: string;
  Component: React.ElementType;
  useCases?: UseCases;
}) => {
  const describeName = deriveDescribeName({ dirname });

  const useCases = useCasesProp || defaultUseCases;

  // const isJest = !!process.env.IS_JEST;
  const isStorybook = !!process.env.STORYBOOK_IS_STORYBOOK;

  if (isStorybook) {
    storybookRunner({
      Component,
      describeName,
      useCases,
    });
  }

  // if (isJest) {
  //   jestRunner({
  //     Component,
  //     describeName,
  //     useCases,
  //   });
  // }
};
