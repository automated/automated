import type ChangeCase from 'change-case';
import type JestImageSnapshot from 'jest-image-snapshot';
import type Puppeteer from 'puppeteer/lib/types';
import React from 'react';
import type TestRenderer from 'react-test-renderer';
import type SnapshotDiff from 'snapshot-diff';

import { deriveModule } from '../shared';
import { getStorybookUrl } from '../storybook/shared';
import { UseCases } from '../types';
import deriveDescribeName from '../utils/derive-describe-name';
import deriveUseCases from '../utils/derive-use-cases';
import screenshotConfigs from './screenshot-configs';

// eslint-disable-next-line import/prefer-default-export
export const runner = async ({
  dirname,
  Component,
  useCases: useCasesProp,
}: {
  dirname: string;
  Component: React.ElementType;
  useCases?: UseCases;
}) => {
  const { paramCase }: typeof ChangeCase = await deriveModule('change-case');
  const snapshotDiff: typeof SnapshotDiff = await deriveModule('snapshot-diff');
  const { toMatchImageSnapshot }: typeof JestImageSnapshot = await deriveModule(
    'jest-image-snapshot',
  );
  const puppeteer: typeof Puppeteer = await deriveModule('puppeteer');
  const testRenderer: typeof TestRenderer = await deriveModule(
    'react-test-renderer',
  );

  expect.extend({
    toMatchImageSnapshot,
  });

  const describeName = deriveDescribeName({ dirname });
  const useCases = deriveUseCases({ useCases: useCasesProp });

  const isStorybookRunning = process.env.AUTOMATED_STORYBOOK_IS_RUNNING;
  const storybookTestFn = isStorybookRunning ? test : test.skip;
  let browser: Puppeteer.Browser;

  beforeAll(async () => {
    if (isStorybookRunning) {
      browser = await puppeteer.launch({
        // headless: false,
        args: ['--no-sandbox'],
      });
    } else if (process.env.AUTOMATED_JEST_VISUAL_REGRESSION_REQUIRED) {
      throw new Error(
        '`AUTOMATED_JEST_VISUAL_REGRESSION_REQUIRED` is true, ' +
          'but visual regression is disabled',
      );
    }
  });

  describe(describeName, () => {
    useCases.forEach(async (item, key) => {
      const { name, props } = item;

      afterAll(async () => {
        if (browser) await browser.close();
      });

      test(`snapshot-${name}`, async () => {
        const render = testRenderer.create(<Component {...props} />).toJSON();

        if (!key) {
          expect(render).toMatchSnapshot();
        } else {
          expect(
            snapshotDiff(<Component {...useCases[0].props} />, render),
          ).toMatchSnapshot();
        }
      });

      Object.entries(screenshotConfigs).forEach(
        ([
          configName,
          { viewport, matchImageSnapshotOptions, screenshotOptions },
        ]) => {
          storybookTestFn(
            `storybook@${describeName}@${name}@${configName}`,
            async () => {
              if (browser) {
                const page = await browser.newPage();

                await page.evaluateOnNewDocument(() => {
                  const style = document.createElement('style');
                  style.innerHTML = '.body { caret-color: transparent }';
                  document.getElementsByTagName('head')[0].appendChild(style);
                });

                const storybookId = `${paramCase(describeName)}--${name}`;

                const url = `${getStorybookUrl()}/iframe.html?id=${storybookId}&args=&viewMode=story`;
                await page.goto(url);
                await page.setViewport(viewport);

                const image = await page.screenshot(screenshotOptions);

                expect(image).toMatchImageSnapshot(matchImageSnapshotOptions);

                await page.close();
              }
            },
          );
        },
      );
    });
  });
};
