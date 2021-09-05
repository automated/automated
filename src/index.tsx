import React from 'react';
// import { storiesOf } from '@storybook/react';

import { UseCase, UseCases } from './types';

import jestRunner from './jest';
import storybookRunner from './storybook';

const deriveDescribeName = ({ filename }: { filename: string }) => {
  const pwd = String(process.env.PWD);
  if (!pwd || pwd === 'undefined') {
    throw new Error('Missing `process.env.PWD`');
  }
  return filename.replace(pwd, '');

  // const initCwd = String(theirProcess.env.INIT_CWD);
  // if (!initCwd || initCwd === 'undefined') {
  //   // throw new Error('Missing `process.env.INIT_CWD`');
  // }
  // const describeName = filename.replace(initCwd, '');
};

// const fooModule = module;

const defaultUseCase: UseCase = {};
const defaultUseCases: UseCases = { default: defaultUseCase };

export const runner = ({
  filename,
  Component,
  useCases: useCasesProp,
}: {
  filename: string;
  Component: React.ElementType;
  useCases?: UseCases;
}) => {
  // const describeName = deriveDescribeName({ filename });

  // const useCases = useCasesProp || defaultUseCases;

  // const isJest = !!process.env.IS_JEST;
  const isStorybook = !!process.env.STORYBOOK_IS_STORYBOOK;

  // const Button = () => <div>kldskjsflk</div>;

  // storiesOf('Button', fooModule).add('with text', () => <Button />);
  if (isStorybook) {
    storybookRunner(module);
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
//   // storybookRunner({
//   //   Component,
//   //   describeName,
//   //   useCases,
//   //   fooModule: module,
//   // });
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
