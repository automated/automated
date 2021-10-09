import { UseCases } from '../types';
declare const base: ({ useCases: useCasesProp }: {
    useCases?: UseCases;
}) => ({
    name: string;
    props: import("../types").Props;
} | {
    name: string;
    props: {};
})[];
export default base;
