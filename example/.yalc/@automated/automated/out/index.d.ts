/// <reference types="webpack-env" />
/// <reference types="node" />
import React from 'react';
declare type Props = Record<string, any>;
export declare type UseCase = {
    /** Will use the key as the name unless a string is provided **/
    name?: string;
    /** The React props to use **/
    props?: Props;
};
declare type UseCases = Record<TestName, UseCase>;
export declare type TestName = string;
declare type Process = NodeJS.Process & {
    env: {
        INIT_CWD?: string;
    };
};
export declare const runner: ({ filename, Component, process: theirProcess, useCases: useCasesProp, }: {
    filename: string;
    process: Process;
    Component: React.ElementType;
    useCases?: UseCases | undefined;
}) => void;
export {};
