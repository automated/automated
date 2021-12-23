import { Browser } from 'puppeteer/lib/types';
import { paramCase } from 'change-case';
import snapshotDiff from 'snapshot-diff';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { UseCases } from '../types';
import deriveDescribeName from '../utils/derive-describe-name';
import deriveUseCases from '../utils/derive-use-cases';
const shared = require('../storybook/shared');
import puppeteer from 'puppeteer';
import TestRenderer from 'react-test-renderer';
import React from 'react';
import screenshotConfigs from './screenshot-configs';

expect.extend({
  toMatchImageSnapshot,
});

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

  let isStorybookRunning = process.env.AUTOMATED_STORYBOOK_IS_RUNNING;
  let storybookTestFn = isStorybookRunning ? test : test.skip;
  let browser: Browser;

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
        const render = TestRenderer.create(<Component {...props} />);
        // const renderToJson = render.toJSON();

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

                const url = `${shared.getStorybookUrl()}/iframe.html?id=${storybookId}&args=&viewMode=story`;
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
