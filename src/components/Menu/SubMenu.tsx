import React, { useContext, useState, FC, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { menuContext } from './Menu'
import { MenuItemProps } from './MenuItem'
import { Icon } from '../Icon/Icon'
import { Transition } from '../Transition/Transition'

export interface SubMenuProps {
  index?: string
  title: string
  className?: string
  children?: React.ReactNode
}

// 整个子菜单
export const SubMenu: FC<SubMenuProps> = (props) => {
  const context = useContext(menuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  // 此index是menu组件传过来的active的index
  const { index, title, className, children } = props
  const isOpen = index && context.mode === 'vertical' ? openedSubMenus.includes(index) : false
  const [menuOpen, setOpen] = useState(isOpen)
  const subMenuClass = classNames('menu-item', 'submenu-item', className, {
    active: context.index === index,
    'is-vertical': context.mode === 'vertical',
    'is-open': menuOpen,
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }

  // vertical时，需要点击展开菜单
  // horizontal时，不需要点击
  const clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {}
  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true)
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false)
          },
        }
      : {}

  // 子菜单里面的每一项
  const renderChildren = () => {
    const childrenClass = classNames('submenu', {
      'menu-opened': menuOpen,
    })
    const childrenComponents = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        })
      } else {
        console.error('Warning: Submenu has a child that is not a MenuItem component')
      }
    })
    return (
      <Transition in={menuOpen} timeout={300} animation='zoom-in-bottom'>
        <ul className={childrenClass}>{childrenComponents}</ul>
      </Transition>
    )
  }

  return (
    // 直接解构赋值替换原有的方法
    <li key={index} className={subMenuClass} {...hoverEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title}
        <Icon icon='angle-down' className='arrow-icon'></Icon>
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
