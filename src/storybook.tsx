import { storiesOf } from '@storybook/react';
import { UseCases } from './types';
import React from 'react';
import Wrapper from './storybook/wrapper';

const base = ({
  useCases,
  Component,
  describeName,
}: {
  useCases: UseCases;
  Component: React.ElementType;
  describeName: string;
}) => {
  const storiesOfInstance = storiesOf(describeName, module);

  Object.entries(useCases).forEach(([key, value]) => {
    const { props } = value;

    storiesOfInstance.add(key, () => (
      <Wrapper>
        <Component {...props} />
      </Wrapper>
    ));
  });
};

export default base;
