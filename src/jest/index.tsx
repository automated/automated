import { Browser } from 'puppeteer/lib/types';
import { paramCase } from 'change-case';
import { toMatchDiffSnapshot } from 'snapshot-diff';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { UseCases } from '../types';
import deriveDescribeName from '../utils/derive-describe-name';
import deriveUseCases from '../utils/derive-use-cases';
import asyncLoop from '../utils/async-loop';
import shared from '../shared';
import puppeteer from 'puppeteer';
import TestRenderer from 'react-test-renderer';
import React from 'react';

import fetch from 'node-fetch';

expect.extend({ toMatchImageSnapshot, toMatchDiffSnapshot });

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

  let browser: Browser;
  let isStorybookRunning = false;

  beforeAll(async () => {
    try {
      const storybookRes = await fetch(shared.storybookUrl);
      console.log(storybookRes);

      isStorybookRunning = true;

      browser = await puppeteer.launch({
        headless: false,
      });
    } catch (error) {
      // console.log(error);
    }
  });

  afterAll(async () => {
    if (isStorybookRunning) {
      await browser.close();
    }
  });

  describe(describeName, () => {
    Object.entries(useCases).forEach(async ([key, value]) => {
      const { props } = value;

      test(`snapshot-${key}`, async () => {
        const render = TestRenderer.create(<Component {...props} />);
        const renderToJson = render.toJSON();
        if (key === 'default') renderToJson;
        expect(renderToJson).toMatchSnapshot();
      });

      if (isStorybookRunning) {
        test(`image-${key}`, async () => {
          const page = await browser.newPage();

          const url = `${shared.storybookUrl}/iframe.html?id=${paramCase(
            describeName,
          )}--${key}&args=&viewMode=story`;
          console.log(url);
          await page.goto(url);

          // caret-color: transparent;

          // await page.screenshot({ path: `example-${key}.png` });
          const image = await page.screenshot();

          await page.close();

          expect(image).toMatchImageSnapshot();
        });
      }
    });
  });
};
