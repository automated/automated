import { UseCase as GenericUseCase } from '@automated/automated';
import { Props } from '.';
interface UseCase extends Omit<GenericUseCase, 'props'> {
    props: Props;
}
declare const _default: {
    dirname: string;
    Component: ({ background, text, onClick }: Props) => any;
    useCases: UseCase[];
};
export default _default;
