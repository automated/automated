import { storiesOf } from '@storybook/react';
import { UseCases } from './types';
import React from 'react';
import Wrapper from './storybook/wrapper';

// const base = ({
//   useCases,
//   Component,
//   describeName,
// }: {
//   useCases: UseCases;
//   Component: React.ElementType;
//   describeName: string;
// }) => {
const base = (fooModule: any) => {
  const Button = () => <div>fffkldskjsflk</div>;

  storiesOf('Button', fooModule).add('with text', () => <Button />);

  // const foo = storiesOf('Button', module);

  // const Foo = () => <div>kldskjsflk</div>;

  // foo.add('hello', () => <Foo />);

  // const foo = storiesOf('Button', module);

  // Object.entries(useCases).forEach(([key, value]) => {
  //   const { props } = value;

  //   console.log(key, value);

  //   foo.add(key, () => (
  //     <Wrapper>
  //       <Component {...props} />
  //     </Wrapper>
  //   ));
  // });
};

export default base;
