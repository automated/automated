import React from 'react';

import type Puppeteer from 'puppeteer/lib/types';
import type SnapshotDiff from 'snapshot-diff';
import type ChangeCase from 'change-case';
import type JestImageSnapshot from 'jest-image-snapshot';

import deriveDescribeName from '../utils/derive-describe-name';
import { UseCases } from '../types';
import screenshotConfigs from './screenshot-configs';
import deriveUseCases from '../utils/derive-use-cases';
import { getStorybookUrl } from '../storybook/shared';
import { deriveModule } from '../shared';

export const runner = async ({
  dirname,
  Component,
  useCases: useCasesProp,
}: {
  dirname: string;
  Component: React.ElementType;
  useCases?: UseCases;
}) => {
  const { paramCase }: typeof ChangeCase = deriveModule('change-case');
  const snapshotDiff: typeof SnapshotDiff =
    deriveModule('snapshot-diff').default;
  const { toMatchImageSnapshot }: typeof JestImageSnapshot = deriveModule(
    'jest-image-snapshot',
  );
  const puppeteer: typeof Puppeteer = deriveModule('puppeteer');
  // import TestRenderer from 'react-test-renderer';

  expect.extend({
    toMatchImageSnapshot,
  });

  const describeName = deriveDescribeName({ dirname });
  const useCases = deriveUseCases({ useCases: useCasesProp });

  let isStorybookRunning = process.env.AUTOMATED_STORYBOOK_IS_RUNNING;
  let storybookTestFn = isStorybookRunning ? test : test.skip;
  let browser: Puppeteer.Browser;

  beforeAll(async () => {
    if (isStorybookRunning) {
      browser = await puppeteer.launch({
        // headless: false,
        args: ['--no-sandbox'],
      });
    } else {
      if (process.env.AUTOMATED_JEST_VISUAL_REGRESSION_REQUIRED) {
        throw new Error(
          '`AUTOMATED_JEST_VISUAL_REGRESSION_REQUIRED` is true, ' +
            'but visual regression is disabled',
        );
      }
    }
  });

  describe(describeName, () => {
    useCases.forEach(async (item, key) => {
      const { name, props } = item;

      afterAll(async () => {
        if (browser) await browser.close();
      });

      test(`snapshot-${name}`, async () => {
        // const render = TestRenderer.create(<Component {...props} />);

        if (!key) {
          expect(<Component {...props} />).toMatchSnapshot();
        } else {
          expect(
            snapshotDiff(
              <Component {...useCases[0].props} />,
              <Component {...props} />,
            ),
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
