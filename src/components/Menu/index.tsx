import { FC } from 'react'
import { Menu, MenuProps } from './Menu'
import { SubMenu, SubMenuProps } from './SubMenu'
import { MenuItem, MenuItemProps } from './MenuItem'
// 交叉类型定义
export type IMenuComponent = FC<MenuProps> & {
  SubMenu: FC<SubMenuProps>
  Item: FC<MenuItemProps>
}

const TransMenu = Menu as IMenuComponent
TransMenu.SubMenu = SubMenu
TransMenu.Item = MenuItem

export default TransMenu
