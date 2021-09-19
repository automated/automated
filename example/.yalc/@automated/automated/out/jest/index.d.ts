import { UseCases } from '../types';
import React from 'react';
export declare const runner: ({ dirname, Component, useCases: useCasesProp, }: {
    dirname: string;
    Component: React.ElementType;
    useCases?: UseCases | undefined;
}) => void;
