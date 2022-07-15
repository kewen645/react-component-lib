import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Icon } from '../Icon/Icon'
import classNames from 'classnames'

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /** not showing input, default is false */
  disabled?: boolean
  /** the size of input 'lg' or 'sm' */
  size?: InputSize
  /** input with an icon (eg: search icon) */
  icon?: IconProp
  /** element that prepends to the input */
  prepend?: string | ReactElement
  /** element that appends to the input */
  append?: string | ReactElement
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props
  const inputClass = classNames('input-wrapper', {
    [`input-size-${size}`]: size,
    disabled,
    'input-group': prepend || append,
    'input-group-prepend': !!prepend,
    'input-group-append': !!append,
  })

  const fixValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) return ''
    return value
  }

  // 当input的value存在，就要删除input的defaultValue,因为两者不能同时存在
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixValue(props.value)
  }

  return (
    <div className={inputClass} style={style}>
      {prepend && <div className='input-group-prepend'>{prepend}</div>}
      {icon && (
        <div className='icon-wrapper'>
          <Icon icon={icon} />
        </div>
      )}
      <input className='input-inner' disabled={disabled} {...restProps} />
      {append && <div className='input-group-append'>{append}</div>}
    </div>
  )
}

Input.defaultProps = {
  disabled: false,
}
