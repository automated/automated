import { UseCase as GenericUseCase } from '@automated/automated';
import { runner } from '@automated/automated/out/jest/index';

import Component, { Props } from './';

interface UseCase extends Omit<GenericUseCase, 'props'> {
  props: Props;
}

const defaults: UseCase = {
  props: {
    onClick: () => {},
  },
};

const useCases: Array<UseCase> = [
  defaults,

  {
    name: 'Set text',
    props: {
      ...defaults.props,

      text: 'Hello automated',
    },
  },

  {
    name: 'Set background',
    props: {
      ...defaults.props,

      background: 'green',
    },
  },
];

runner({
  dirname: __dirname,
  Component,
  useCases,
});
