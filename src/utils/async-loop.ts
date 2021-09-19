const asyncLoop = (array: Array<any>, func: Function): Promise<any> =>
  new Promise((resolve) => {
    let index = 0;

    const runner = async (): Promise<any> => {
      const item = array[index];
      if (index < array.length) {
        await func(item, index, resolve);
      } else {
        resolve(undefined);
        return;
      }

      index += 1;
      await runner();
    };

    runner();
  });

export default asyncLoop;
