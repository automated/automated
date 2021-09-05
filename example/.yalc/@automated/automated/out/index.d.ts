import React from 'react';
import { UseCases } from './types';
export declare const runner: ({ dirname, Component, useCases: useCasesProp, }: {
    dirname: string;
    Component: React.ElementType;
    useCases?: UseCases | undefined;
}) => void;
export * from './types';
