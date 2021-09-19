import { runner } from '@automated/automated/out/jest/index';
import Component from './';

runner({
  dirname: __dirname,
  Component,
});
