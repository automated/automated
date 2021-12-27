export default (condition: Function, interval = 1000) =>
  new Promise((resolve) => {
    const runner = () => {
      const timeout = setTimeout(runner, interval);

      if (condition()) {
        clearTimeout(timeout);
        resolve(undefined);
        return;
      }
    };

    runner();
  });
