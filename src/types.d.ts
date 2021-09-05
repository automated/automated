export type Props = Record<string, any>;

export type UseCase = {
  /** Will use the key as the name unless a string is provided **/
  name?: string;

  /** The React props to use **/
  props?: Props;
};

export type UseCases = Record<TestName, UseCase>;

export type TestName = string;

type Process = NodeJS.Process & {
  env: {
    INIT_CWD?: string;
  };
};
