import { UseCases } from '../types';

const base = ({ useCases: useCasesProp }: { useCases?: UseCases }) => {
  return (
    useCasesProp || [
      {
        name: 0,
        props: {},
      },
    ]
  ).map((item, key) => {
    return {
      ...item,

      name: `test-${key + 1}`,
    };
  });
};

export default base;
