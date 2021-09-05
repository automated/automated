import React from 'react';
import { UseCase, UseCases } from '../types';
import { storiesOf } from '@storybook/react';
// import storybookRunner from './storybook';
// import jestRunner from './jest';

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

const defaultUseCase: UseCase = {};
const defaultUseCases: UseCases = { default: defaultUseCase };

export const runner = ({
  filename,
  Component,
  // process: theirProcess,
  useCases: useCasesProp,
}: {
  filename: string;
  // process: Process;
  Component: React.ElementType;
  useCases?: UseCases;
}) => {
  const foo = storiesOf('Button', module);

  const Foo = () => <div>kldskjsflk</div>;

  foo.add('hello', () => <Foo />);
};
