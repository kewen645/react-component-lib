import React, { FC } from 'react';
export declare type MenuMode = 'horizontal' | 'vertical';
declare type selectCallback = (selectedIndex: string) => void;
interface IMenuContext {
    index: string;
    onSelect?: selectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export interface MenuProps {
    /** default index if the index is not set in the first place */
    defaultIndex?: string;
    /** classes that user customizes */
    className?: string;
    /** horizontal or vertical */
    mode?: MenuMode;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    /** () => void */
    onSelect?: selectCallback;
    /** an array represents which submenu should be open after rendering */
    defaultOpenSubMenus?: string[];
}
export declare const menuContext: React.Context<IMenuContext>;
export declare const Menu: FC<MenuProps>;
export {};
