import {
  TestName,
  UseCase as DefaultUseCase,
  runner,
} from '@automated/automated';

import Component, { Props } from './';

interface UseCase extends Omit<DefaultUseCase, 'props'> {
  props: Props;
}

const useCases: Record<TestName, UseCase> = {};

useCases.default = {
  props: {
    onClick: () => {},
  },
};

useCases.setText = {
  props: {
    ...useCases.default.props,
    text: 'Hello automated',
  },
};

useCases.setBackground = {
  props: {
    ...useCases.default.props,
    background: 'green',
  },
};

runner({
  filename: __filename,
  process,
  Component,
  useCases,
});
