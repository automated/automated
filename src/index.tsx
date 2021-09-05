import React from 'react';

import { UseCase, UseCases } from './types';

import jestRunner from './jest';
import storybookRunner from './storybook';
import deriveDescribeName from './utils/derive-describe-name';
// const fooModule = module;

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

  const isJest = !!process.env.IS_JEST;
  const isStorybook = !!process.env.STORYBOOK_IS_STORYBOOK;

  if (isStorybook) {
    storybookRunner({
      Component,
      describeName,
      useCases,
    });
  }
};

//   /*

//     Storybook is super brittle – I’m having to do back-flips to make it work.
//     Here are some notes:

//     - env must be prefixed with `STORYBOOK_` otherwise it’s just blown away.

//     - I cannot figure out how to get `storiesOf` to run in another file, so it
//       needs to be inlined here

//     - Dynamic story support is being dropped for no reason.
//       See https://github.com/ComponentDriven/csf/issues/26

//   */

//   // storybookRunner(module);

//   const foo = storiesOf('Button', module);
//   const Foo = () => <div>kldskjsflk</div>;
//   foo.add('hello', () => <Foo />);

//   // Object.entries(useCases).forEach(([key, value]) => {
//   //   const { props } = value;

//   //   console.log(key, value);

//   //   foo.add(key, () => (
//   //     <Wrapper>
//   //       <Component {...props} />
//   //     </Wrapper>
//   //   ));
//   // });
//   // }

//   // if (isJest) {
//   // jestRunner({
//   //   Component,
//   //   describeName,
//   //   useCases,
//   // });
//   // }
// };

export * from './types';
