import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Menu, MenuProps } from './Menu'
import { MenuItem } from './MenuItem'
import { SubMenu } from './SubMenu'

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
  mode: 'vertical',
  defaultOpenSubMenus: ['4'],
}

const generateMenu = (props: MenuProps) => (
  <Menu {...props}>
    {/* defaultIndex element has active class */}
    <MenuItem>active</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>xyz</MenuItem>
    <SubMenu title='title1'>
      <MenuItem>droptext</MenuItem>
    </SubMenu>
    <SubMenu title='title2'>
      <MenuItem>opentext</MenuItem>
    </SubMenu>
  </Menu>
)

const createStyleFile = () => {
  const cssFile: string = `
    .submenu {
      display: none;
    }
    .submenu.menu-opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  // default behavior, no need to add the sentence below
  // style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

const setup = (scenario: MenuProps) => render(generateMenu(scenario))

// beforeEach: 每个test case都会执行，多次执行, repeating setup
// beforeAll:  只执行一次，one-time setup

describe('test Menu and MenuItem component', () => {
  // 每个case开始前都会执行beforeEach的逻辑
  // 但是render不建议写在beforeEach里面，也无需创建wrapper变量接受render返回值
  // 事实上screen方法就能很好处理，并且也实现了auto cleanup
  //  you don't need to call cleanup in an afterEach or beforeEach function.
  // beforeEach(() => {

  // })
  it('should render correct Menu and MenuItem on default(horizontal) mode', () => {
    const style = createStyleFile()
    setup(testProps).container.append(style)
    // menu.tsx父组件加上data-testid="test-menu"
    const menuElement = screen.getByTestId('test-menu')
    const activeElement = screen.getByText('active')
    const disabledElement = screen.getByText('disabled')
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
    expect(activeElement).toHaveClass('menu-item active')
    expect(disabledElement).toHaveClass('menu-item disabled')
  })

  it('clicking items should change to active and callback is called', () => {
    const style = createStyleFile()
    setup(testProps).container.append(style)
    const activeElement = screen.getByText('active')
    const disabledElement = screen.getByText('disabled')
    const xyzElement = screen.getByText('xyz')
    userEvent.click(xyzElement)
    expect(xyzElement).toHaveClass('active')
    expect(activeElement).not.toHaveClass('active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    userEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it('should show dropdown menu while hovering on submenu(horizontally aligned)', async () => {
    const style = createStyleFile()
    setup(testProps).container.append(style)
    expect(screen.queryByText('droptext')).toBeNull()
    userEvent.hover(screen.getByText('title1'))
    await waitFor(() => {
      expect(screen.getByText('droptext')).toBeVisible()
    })
    userEvent.click(screen.getByText('droptext'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    userEvent.unhover(screen.getByText('title1'))
    await waitFor(() => {
      expect(screen.queryByText('droptext')).not.toBeVisible()
    })
  })
})

describe('test Menu and MenuItem components in vertical mode', () => {
  it('should render vertical mode when mode is set to vertical', () => {
    const style = createStyleFile()
    setup(testVerticalProps).container.append(style)
    const menuElement = screen.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })

  it('should show dropdown items while clicking on submenu on vertical mode', () => {
    const style = createStyleFile()
    setup(testVerticalProps).container.append(style)
    expect(screen.queryByText('droptext')).toBeNull()
    userEvent.click(screen.getByText('title1'))
    expect(screen.getByText('droptext')).toBeVisible()
  })

  it('should show submenu dropdown when defaultOpenSubMenus prop is present', () => {
    const style = createStyleFile()
    setup(testVerticalProps).container.append(style)
    expect(screen.queryByText('opentext')).toBeVisible()
  })
})
