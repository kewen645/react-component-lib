import React from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
declare type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
export declare type TransitionProps<Ref extends HTMLElement | undefined = undefined> = CSSTransitionProps<Ref> & {
    animation?: AnimationName;
    wrapper?: boolean;
    children?: React.ReactNode;
};
export declare const Transition: React.FC<TransitionProps>;
export {};
