import { Menu } from '../components/Menu/Menu'
import { MenuItem } from '../components/Menu/MenuItem'
import { SubMenu } from '../components/Menu/SubMenu'

function MenuDemo() {
  return (
    <>
      <Menu
        defaultIndex='0'
        defaultOpenSubMenus={['3']}
        onSelect={(index) => {
          alert(index)
        }}>
        <MenuItem>title one</MenuItem>
        <MenuItem disabled>disabled link</MenuItem>
        <MenuItem>
          <a href='http://www.baidu.com'>Baidu!</a>
        </MenuItem>
        <SubMenu title='dropdown'>
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
        <MenuItem>cool link 3</MenuItem>
      </Menu>
    </>
  )
}

export default MenuDemo
