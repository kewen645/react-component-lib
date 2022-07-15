import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'

export interface TabItemProps {
  /** tab label content */
  label: any
  /** extensible className */
  className?: string
  /** tab flag for activation */
  isActive?: boolean
  /** disable tab */
  disabled?: boolean
  /** tab content */
  children?: ReactNode
}

export const TabItem: FC<TabItemProps> = (props) => {
  const { label, className, isActive, children } = props
  const tabItemClass = classNames('tab-content', className, {
    'tab-content-active': isActive,
  })

  return (
    <div key={label} className={tabItemClass}>
      {children}
    </div>
  )
}

TabItem.defaultProps = {
  disabled: false,
  isActive: false,
}

TabItem.displayName = 'TabItem'
