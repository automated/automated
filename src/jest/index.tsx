import { Browser } from 'puppeteer/lib/types';
import { paramCase } from 'change-case';
import { toMatchDiffSnapshot } from 'snapshot-diff';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { UseCases } from '../types';
import deriveDescribeName from '../utils/derive-describe-name';
import deriveUseCases from '../utils/derive-use-cases';
import shared from '../shared';
import puppeteer from 'puppeteer';
import TestRenderer from 'react-test-renderer';
import React from 'react';
import screenshotConfig from './screenshot-config';

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

  let isStorybookRunning = process.env.STORYBOOK_IS_RUNNING;
  let storybookTestFn = isStorybookRunning ? test : test.skip;
  let browser: Browser;

  beforeAll(async () => {
    if (isStorybookRunning) {
      browser = await puppeteer.launch({
        // headless: false,
      });
    }
  });

  describe(describeName, () => {
    useCases.forEach(async (item, key) => {
      const { name, props } = item;

      afterAll(async () => {
        if (browser) await browser.close();
      });

      test(`snapshot-${name}`, async () => {
        const render = TestRenderer.create(<Component {...props} />);
        const renderToJson = render.toJSON();
        if (!key) renderToJson;
        expect(renderToJson).toMatchSnapshot();
      });

      console.log(screenshotConfig);

      storybookTestFn(`storybook-${name}`, async () => {
        if (browser) {
          const page = await browser.newPage();

          await page.evaluateOnNewDocument(() => {
            const style = document.createElement('style');
            style.innerHTML = '.body { caret-color: transparent }';
            document.getElementsByTagName('head')[0].appendChild(style);
          });

          const id = `${paramCase(describeName)}--${name}`;

          const url = `${shared.storybookUrl}/iframe.html?id=${id}&args=&viewMode=story`;
          await page.goto(url);
          await page.setViewport({
            deviceScaleFactor: 2,
            height: 768,
            width: 1080,
          });

          const image = await page.screenshot({
            omitBackground: true,
          });

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
