import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

type ButtonSize = 'lg' | 'sm'
type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  /** This is the className that user customizes */
  className?: string
  /** Disabled by default */
  disabled?: boolean
  /** Button size, lg or sm */
  size?: ButtonSize
  /** Button type, could be primary, danger, default, and link */
  btnType?: ButtonType
  /** this is specific for link button */
  href?: string
  /** the button text */
  children?: ReactNode
}

// intersection types: combine multiple types into one
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

export const Button: FC<ButtonProps> = (props) => {
  const { btnType, disabled, size, children, className, href, ...restProps } = props

  const btnClass = classNames(
    // 默认有btn这个className
    'btn',
    // 用户自定义的属性
    className,
    // Dynamic class names
    {
      [`btn-${btnType}`]: btnType,
      [`btn-${size}`]: size,
      disabled: btnType === 'link' && disabled,
    }
  )

  // link
  if (btnType === 'link' && href) {
    return (
      <a className={btnClass} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={btnClass} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

// default props
Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}
