import { UseCases } from '../types';

const base = ({ useCases: useCasesProp }: { useCases?: UseCases }) =>
  (
    useCasesProp || [
      {
        name: 0,
        props: {},
      },
    ]
  ).map((item, key) => ({
    ...item,

    name: `test-${key + 1}`,
  }));

export default base;
