import React, { FC, CSSProperties } from 'react'
import { ThemeProps } from '../Icon/Icon'

export interface ProgressProps {
  /** percentage to be shown */
  percent: number
  /** the height of loading bar */
  strokeHeight?: number
  /** set the text to be shown or not */
  showText?: boolean
  /** user customized style */
  styles?: CSSProperties
  /** theme to choose */
  theme?: ThemeProps
}

export const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props
  return (
    <div className='progress-bar' style={styles}>
      <div className='progress-bar-outer' style={{ height: `${strokeHeight}px` }}>
        <div className={`progress-bar-inner color-${theme}`} style={{ width: `${percent}%` }}>
          {showText && <span className='inner-text'>{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
}
