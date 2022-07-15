import React, { useContext, FC, ReactNode, CSSProperties } from 'react'
import { menuContext } from './Menu'
import classNames from 'classnames'

export interface MenuItemProps {
  index?: string
  disabled?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props
  const context = useContext(menuContext)
  const menuItemClass = classNames('menu-item', className, {
    disabled,
    active: index === context.index && !disabled,
  })

  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index)
    }
  }

  return (
    <li className={menuItemClass} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'
