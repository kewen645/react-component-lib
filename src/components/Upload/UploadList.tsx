import React, { FC } from 'react'
import { UploadFile } from './Upload'
import { Icon } from '../Icon/Icon'
import { Progress } from '../Progress/Progress'

export interface UploadListProps {
  fileList: UploadFile[]
  onRemove: (_file: UploadFile) => void
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props
  return (
    <ul className='upload-list'>
      {fileList.map((item) => {
        return (
          <li className='upload-list-item' key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon='file-alt' theme='secondary' />
              {item.name}
            </span>
            <span className='file-status'>
              {item.status === 'uploading' && <Icon icon='spinner' spin theme='primary' />}
              {item.status === 'success' && <Icon icon='check-circle' theme='success' />}
              {item.status === 'failure' && <Icon icon='times-circle' theme='danger' />}
            </span>
            <span className='file-actions'>
              <Icon icon='times' onClick={() => onRemove(item)} />
            </span>
            {item.status === 'uploading' && <Progress percent={item.percent || 0} />}
          </li>
        )
      })}
    </ul>
  )
}
