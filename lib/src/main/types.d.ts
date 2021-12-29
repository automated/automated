export type Props = Record<string, any>;

export type UseCase = {
  /** The title associated with a test */
  name?: string;

  /** The React props to use */
  props: Props;
};

export type UseCases = Array<UseCase>;

type Process = NodeJS.Process & {
  env: {
    INIT_CWD?: string;
  };
};
