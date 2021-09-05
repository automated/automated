import { storiesOf } from '@storybook/react';
import { UseCases } from './types';
import React from 'react';
import Wrapper from './storybook/wrapper';

const base = ({
  useCases,
  Component,
  describeName,
}: // module: theirModule,
{
  useCases: UseCases;
  Component: React.ElementType;
  describeName: string;
  // module: NodeModule;
}) => {
  // const base = (fooModule: any) => {
  // const Button = () => <div>fffkldskjsflk</div>;

  // storiesOf(describeName, module).add('with text', () => <Component />);

  // const foo = storiesOf('Button', module);

  // const Foo = () => <div>kldskjsflk</div>;

  // foo.add('hello', () => <Foo />);

  const foo = storiesOf(describeName, module);

  Object.entries(useCases).forEach(([key, value]) => {
    const { props } = value;

    console.log(key, value);

    foo.add(key, () => (
      <Wrapper>
        <Component {...props} />
      </Wrapper>
    ));
  });
};

export default base;
