import { storiesOf } from '@storybook/react';
import { UseCases } from '../types';
import React from 'react';
import Wrapper from './wrapper';
import deriveDescribeName from '../utils/derive-describe-name';
import deriveUseCases from '../utils/derive-use-cases';

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
  const useCases = deriveUseCases({ useCases: useCasesProp });
  const storiesOfInstance = storiesOf(describeName, module);

  useCases.forEach((item) => {
    const { name, props } = item;

    storiesOfInstance.add(name, () => (
      <Wrapper>
        <Component {...props} />
      </Wrapper>
    ));
  });
};
