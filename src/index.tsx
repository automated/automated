import { toMatchDiffSnapshot } from 'snapshot-diff';
import React from 'react';
// import { render } from '@testing-library/react';
import TestRenderer from 'react-test-renderer';
import { storiesOf } from '@storybook/react';

// import '@testing-library/jest-dom/extend-expect';
import Wrapper from './storybook/wrapper';

expect.extend({ toMatchDiffSnapshot });

type Props = Record<string, any>;

export type UseCase = {
  /** Will use the key as the name unless a string is provided **/
  name?: string;

  /** The React props to use **/
  props?: Props;
};

type UseCases = Record<TestName, UseCase>;

export type TestName = string;

type Process = NodeJS.Process & {
  env: {
    INIT_CWD?: string;
  };
};

const defaultUseCase: UseCase = {};
const defaultUseCases: UseCases = { default: defaultUseCase };

const isJest = !!process.env.JEST_WORKER_ID;
const isStorybook = !!process.env.STORYBOOK;

export const runner = ({
  filename,
  Component,
  process: theirProcess,
  useCases: useCasesProp,
}: {
  filename: string;
  process: Process;
  Component: React.ElementType;
  useCases?: UseCases;
}) => {
  const initCwd = String(theirProcess.env.INIT_CWD);
  if (!initCwd) throw new Error('Missing `process.env.INIT_CWD`');

  const describeName = filename.replace(initCwd, '');

  const foo = storiesOf('Button', module);

  const useCases = useCasesProp || defaultUseCases;

  if (isStorybook) {
    Object.keys(useCases).forEach((key) => {
      const { props } = useCases[key];
      foo.add(key, () => (
        <Wrapper>
          <Component {...props} />
        </Wrapper>
      ));
    });
  }

  if (isJest) {
    describe(describeName, () => {
      Object.keys(useCases).forEach((key) => {
        const { props } = useCases[key];

        test(key, () => {
          const render = TestRenderer.create(<Component {...props} />);
          const renderToJson = render.toJSON();
          if (key === 'default') renderToJson;
          expect(renderToJson).toMatchSnapshot();
        });
      });
    });
  }
};
