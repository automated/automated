export default (condition: Function, interval = 1000) =>
  new Promise((resolve) => {
    const runner = async () => {
      const timeout = setTimeout(runner, interval);

      if (await condition()) {
        clearTimeout(timeout);
        resolve(undefined);
      }
    };

    runner();
  });
