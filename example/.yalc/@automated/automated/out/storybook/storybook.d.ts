import React from 'react';
import { UseCases } from './types';
export declare const runner: ({ filename, Component, env, useCases: useCasesProp, }: {
    filename: string;
    env: any;
    Component: React.ElementType;
    useCases?: any;
}) => void;
export * from './types';
