import uuidByString from 'uuid-by-string';

const defaults = {
  viewport: {
    deviceScaleFactor: 2,
    height: 768,
    width: 1080,
  },

  screenshot: {
    omitBackground: true,
  },

  matchImageSnapshot: {
    failureThreshold: 0.01,
    failureThresholdType: 'percent',
  },
};

const configs = [defaults];

const out = configs.map((config) => {
  return {
    ...config,

    name: uuidByString(JSON.stringify(config)),
  };
});

console.log(out);

export default out;
