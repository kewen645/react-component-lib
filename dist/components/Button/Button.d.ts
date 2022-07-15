import { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
declare type ButtonSize = 'lg' | 'sm';
declare type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    /** This is the className that user customizes */
    className?: string;
    /** Disabled by default */
    disabled?: boolean;
    /** Button size, lg or sm */
    size?: ButtonSize;
    /** Button type, could be primary, danger, default, and link */
    btnType?: ButtonType;
    /** this is specific for link button */
    href?: string;
    /** the button text */
    children?: ReactNode;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
export declare const Button: FC<ButtonProps>;
export {};
