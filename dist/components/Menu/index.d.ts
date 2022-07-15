import { FC } from 'react';
import { MenuProps } from './Menu';
import { SubMenuProps } from './SubMenu';
import { MenuItemProps } from './MenuItem';
export declare type IMenuComponent = FC<MenuProps> & {
    SubMenu: FC<SubMenuProps>;
    Item: FC<MenuItemProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
