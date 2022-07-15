import React, {
  FC,
  useState,
  ReactNode,
  Children,
  FunctionComponentElement,
  cloneElement,
} from 'react'
import { TabItemProps } from './TabItem'
import classNames from 'classnames'

type TabStyle = 'underline' | 'outline'

export interface TabProps {
  /** activated tab index, default is 0 */
  defaultIndex?: number
  /** tab style: underline(default) or outline */
  styleType?: TabStyle
  /** the callback that clicks tab to trigger*/
  onSelect?: (sleectedIndex: number) => void
  /** extensible className */
  className?: string
  /** tab content */
  children?: ReactNode
}

export const Tab: FC<TabProps> = (props) => {
  const { className, styleType, children, onSelect } = props
  const tabClass = classNames('tab-nav', className, {
    'tab-underline': styleType === 'underline',
    'tab-outline': styleType === 'outline',
  })
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = (index: number, disabled: boolean) => {
    if (disabled) return
    setActiveIndex(index)
    if (typeof onSelect === 'function') {
      onSelect(index)
    }
  }

  const childrenComponent = () => {
    return Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>
      const isLabelDisabled = childElement.props.disabled ? childElement.props.disabled : false
      const tabLabelClass = classNames('tab-label', {
        'tab-label-active': activeIndex === index,
        'tab-label-disabled': childElement.props.disabled,
      })

      const handleChildClick = () => handleClick(index, isLabelDisabled)

      return (
        <li key={index} className={tabLabelClass} onClick={handleChildClick}>
          {childElement.props.label}
        </li>
      )
    })
  }

  const renderChildren = () => {
    return Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>
      const { displayName } = childElement.type
      if (displayName === 'TabItem') {
        return cloneElement(childElement, {
          isActive: activeIndex === index,
        })
      } else {
        console.error('Warning: Tab Component has a child that is not a TabItem component')
      }
    })
  }

  return (
    <div>
      <nav className={tabClass}>
        <ul className='tab-ul'>{childrenComponent()}</ul>
      </nav>
      {renderChildren()}
    </div>
  )
}

Tab.defaultProps = {
  defaultIndex: 0,
  styleType: 'underline',
}
