import React, { useState, ReactNode, FC } from 'react'
import classNames from 'classnames'
import { Icon } from '../Icon/Icon'
import { Transition } from '../Transition/Transition'

export type AlertType = 'success' | 'primary' | 'warning' | 'danger' | 'default'
export interface AlertProps {
  /** title of alert*/
  title?: string
  /** closable icon shown or not */
  closable?: boolean
  /** close icon */
  customClose?: string
  /** close alert event trigger */
  onClose?: () => void
  /** descrition of alert */
  children?: ReactNode
  /** type of alert */
  type: AlertType
}

export const Alert: FC<AlertProps> = (props) => {
  const { title, closable, customClose, onClose, children, type } = props
  const alertClass = classNames('alert', {
    [`alert-${type}`]: type,
  })
  const [visible, setVisible] = useState(true)

  const customCloseP = customClose || <Icon icon='times' className='window-close' size='lg' />

  const handleClick = () => {
    setVisible(false)
    if (onClose) onClose()
  }

  return (
    <Transition in={visible} timeout={300} animation='zoom-in-left' wrapper>
      <div className={alertClass}>
        {title ? <h4 className='alert-title'>{title}</h4> : null}
        <p className='alert-message'>{children}</p>
        {closable ? <i onClick={handleClick}>{customCloseP}</i> : null}
      </div>
    </Transition>
  )
}

Alert.defaultProps = {
  closable: true,
  type: 'primary',
}
