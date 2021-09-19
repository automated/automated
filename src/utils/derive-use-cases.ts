import { UseCase, UseCases } from '../types';

const base = ({ useCases }: { useCases?: UseCases }) => {
  const defaultUseCase: UseCase = {};
  const defaultUseCases: UseCases = { default: defaultUseCase };
  return useCases || defaultUseCases;
};

export default base;
