import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Menu } from './Menu'
import { MenuItem } from './MenuItem'
import { SubMenu } from './SubMenu'

export default {
  title: 'Menus',
  component: Menu,
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        component: 'Menu display',
      },
    },
  },
} as ComponentMeta<typeof Menu>

export const defaultMenu: ComponentStory<typeof Menu> = () => (
  <Menu
    onSelect={(index) => {
      console.log(`clicked ${index} item`)
    }}>
    <MenuItem>cool link</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>cool link 2</MenuItem>
    <SubMenu title='下拉选项'>
      <MenuItem>下拉选项一</MenuItem>
      <MenuItem>下拉选项二</MenuItem>
    </SubMenu>
  </Menu>
)

export const VerticalMenu: ComponentStory<typeof Menu> = () => (
  <Menu
    mode='vertical'
    onSelect={(index) => {
      console.log(`clicked ${index} item`)
    }}>
    <MenuItem>cool link</MenuItem>
    <MenuItem>cool link 2</MenuItem>
    <SubMenu title='点击下拉选项'>
      <MenuItem>下拉选项一</MenuItem>
      <MenuItem>下拉选项二</MenuItem>
    </SubMenu>
  </Menu>
)

export const PreopenMenu = () => (
  <Menu
    mode='vertical'
    defaultOpenSubMenus={['2']}
    onSelect={(index) => {
      console.log(`clicked ${index} item`)
    }}>
    <MenuItem>cool link</MenuItem>
    <MenuItem>cool link 2</MenuItem>
    <SubMenu title='默认展开下拉选项'>
      <MenuItem>下拉选项一</MenuItem>
      <MenuItem>下拉选项二</MenuItem>
    </SubMenu>
  </Menu>
)
