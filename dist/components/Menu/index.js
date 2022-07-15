import { Menu } from './Menu';
import { SubMenu } from './SubMenu';
import { MenuItem } from './MenuItem';
var TransMenu = Menu;
TransMenu.SubMenu = SubMenu;
TransMenu.Item = MenuItem;
export default TransMenu;
