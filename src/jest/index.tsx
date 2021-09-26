import { Browser } from 'puppeteer/lib/types';
import { paramCase } from 'change-case';
import { toMatchDiffSnapshot } from 'snapshot-diff';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { UseCases } from '../types';
import deriveDescribeName from '../utils/derive-describe-name';
import deriveUseCases from '../utils/derive-use-cases';
// import asyncLoop from '../utils/async-loop';
import shared from '../shared';
import puppeteer from 'puppeteer';
import TestRenderer from 'react-test-renderer';
import React from 'react';

import fetch from 'node-fetch';

const console = require('console');

expect.extend({ toMatchImageSnapshot, toMatchDiffSnapshot });

export const runner = async ({
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

  let isStorybookRunning = false;
  let storybookTestFn = process.env.STORYBOOK_IS_RUNNING ? test : test.skip;
  let browser: Browser;

  beforeAll(async () => {
    const { status } = await fetch(shared.storybookUrl);
    isStorybookRunning = status === 200;

    if (isStorybookRunning) {
      browser = await puppeteer.launch({
        headless: false,
      });
    }
  });

  describe(describeName, () => {
    useCases.forEach(async (item, key) => {
      const { name } = item;

      // test(`snapshot-${name}`, async () => {
      //   const render = TestRenderer.create(<Component {...props} />);
      //   const renderToJson = render.toJSON();
      //   if (!key) renderToJson;
      //   expect(renderToJson).toMatchSnapshot();
      // });

      afterAll(async () => {
        if (browser) await browser.close();
      });

      storybookTestFn(`image-${name}`, async () => {
        if (browser) {
          const page = await browser.newPage();

          const id = `${paramCase(describeName)}--${name}`;

          const url = `${shared.storybookUrl}/iframe.html?id=${id}&args=&viewMode=story`;

          await page.goto(url);

          // // caret-color: transparent;

          await page.screenshot({ path: `${id}.png` });
          const image = await page.screenshot();
          expect(image).toMatchImageSnapshot({
            failureThreshold: 0.01,
            failureThresholdType: 'percent',
          });

          await page.close();
        }
      });
    });
  });
};
