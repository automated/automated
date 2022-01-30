import { spawn } from 'child_process';

export default (
  command: Array<string> | string,
  {
    dontExit,
    isSilent,
  }: {
    dontExit?: boolean;
    isSilent?: boolean;
  } = {},
) =>
  new Promise((resolve) => {
    const commandAsArray = typeof command === 'string' ? [command] : command;

    const spawnInstance = spawn(commandAsArray[0], commandAsArray.slice(1), {
      shell: true,
      stdio: isSilent ? 'ignore' : 'inherit',
    });

    spawnInstance.on('close', (code) => {
      if (code && !dontExit) process.exit(code);

      resolve(undefined);
    });
  });
