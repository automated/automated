import { storiesOf } from '@storybook/react';
import React from 'react';

import { UseCases } from '../types';
import deriveDescribeName from '../utils/derive-describe-name';
import deriveUseCases from '../utils/derive-use-cases';
import Wrapper from './wrapper';

// eslint-disable-next-line import/prefer-default-export
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
