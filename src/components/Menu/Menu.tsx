import React, { createContext, useState, FC } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './MenuItem'

export type MenuMode = 'horizontal' | 'vertical'
type selectCallback = (selectedIndex: string) => void

// 传给MenuItem的东西
interface IMenuContext {
  index: string
  onSelect?: selectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

export interface MenuProps {
  /** default index if the index is not set in the first place */
  defaultIndex?: string
  /** classes that user customizes */
  className?: string
  /** horizontal or vertical */
  mode?: MenuMode
  style?: React.CSSProperties
  children?: React.ReactNode
  /** () => void */
  onSelect?: selectCallback
  /** an array represents which submenu should be open after rendering */
  defaultOpenSubMenus?: string[]
}

export const menuContext = createContext<IMenuContext>({ index: '0' })
export const Menu: FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, children, onSelect, defaultOpenSubMenus } = props
  const [currentActive, setActive] = useState(defaultIndex)

  // 子组件需要执行的callback
  const handleSelect = (index: string) => {
    setActive(index)
    if (onSelect) onSelect(index)
  }
  // 需要传给子组件的东西
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleSelect,
    mode,
    defaultOpenSubMenus,
  }

  const menuClass = classNames('menu', className, {
    [`menu-${mode}`]: mode,
  })

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 添加一下index属性
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.error('Warning: Menu has a child that is not a MenuItem component')
      }
    })
  }

  return (
    <ul className={menuClass} style={style} data-testid='test-menu'>
      <menuContext.Provider value={passedContext}>{renderChildren()}</menuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}
