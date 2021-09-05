import { Browser } from 'puppeteer/lib/types';
import { render } from '@testing-library/react';
import { storiesOf } from '@storybook/react';
import { toMatchDiffSnapshot } from 'snapshot-diff';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { UseCases } from './types';
import puppeteer from 'puppeteer';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import Wrapper from './storybook/wrapper';

expect.extend({ toMatchImageSnapshot, toMatchDiffSnapshot });

const base = ({
  useCases,
  Component,
  describeName,
}: {
  useCases: UseCases;
  Component: React.ElementType;
  describeName: string;
}) => {
  let browser: Browser;

  beforeAll(async () => {
    // browser = await puppeteer.launch({
    //   // headless: false,
    // });
  });

  afterAll(async () => {
    await browser.close();
  });

  describe(describeName, () => {
    // console.log('jest!');

    for (const key in useCases) {
      const { props } = useCases[key];

      // test(`snapshot-${key}`, async () => {
      //   const render = TestRenderer.create(<Component {...props} />);
      //   const renderToJson = render.toJSON();
      //   if (key === 'default') renderToJson;
      //   expect(renderToJson).toMatchSnapshot();
      // });

      test(`image-${key}`, async () => {
        const page = await browser.newPage();
        const url = `http://localhost:3144/iframe.html?id=${key}&args=&viewMode=story`;
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
};

export default base;
