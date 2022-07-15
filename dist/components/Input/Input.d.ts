import { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /** not showing input, default is false */
    disabled?: boolean;
    /** the size of input 'lg' or 'sm' */
    size?: InputSize;
    /** input with an icon (eg: search icon) */
    icon?: IconProp;
    /** element that prepends to the input */
    prepend?: string | ReactElement;
    /** element that appends to the input */
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export declare const Input: FC<InputProps>;
export {};
