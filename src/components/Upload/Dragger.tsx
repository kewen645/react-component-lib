import React, { FC, ReactNode, useState, DragEvent } from 'react'
import className from 'classnames'

interface DraggerProps {
  onFile: (files: FileList) => void
  children?: ReactNode
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  const [dragOver, setDrageOver] = useState(false)
  const draggerClass = className('upload-dragger', {
    'is-dragover': dragOver,
  })

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDrageOver(over)
  }

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDrageOver(false)
    onFile(e.dataTransfer.files)
  }

  return (
    <div
      className={draggerClass}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}>
      {children}
    </div>
  )
}
