import { runner } from '@automated/automated/out/storybook/index';
import Component from './';

runner({
  dirname: __dirname,
  Component,
});
