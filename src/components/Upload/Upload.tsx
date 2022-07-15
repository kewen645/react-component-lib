import React, { ChangeEvent, FC, useRef, useState, ReactNode } from 'react'
import axios from 'axios'
import { Dragger } from './Dragger'
import {UploadList} from './UploadList'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'failure'

export interface UploadFile{
  uid: string,
  size: number,
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File
  response?: any
  error?: any
}

export interface UploadProps {
  /** */
  defaultFileList?: UploadFile[]
  /**  the action to fire, where to upload */
  action: string
  /** beforeUpload used to do restrictions for files eg: check size */
  beforeUpload?: (file: File) => boolean | Promise<File>
  /**  progress callback */
  onProgress?: (percentage: number, file: UploadFile) => void
  /**  success callback */
  onSuccess?: (data: any, file: UploadFile) => void
  /**  error callback */
  onError?: (err: any, file: UploadFile) => void
  /** display file uploading process state */ 
  onChange?: (file: UploadFile) => void
  /** remove items from upload file list*/
  onRemove?: (file: UploadFile) => void
  /** customized headers */
  headers?: {[key: string]: any}
  /** file name u want */
  name?: string 
  /** multiple form data allowed */
  data?: {[key: string]: any} 
  /** credentials for file upload, cookie allowed */
  withCredentials?: boolean 
  /** uploading file type acceptance*/ 
  accept?: string
  /** multiple file uploading allowed */ 
  multiple?: boolean,
  /** the button content */
  children?: ReactNode
  /** file is draggable to upload */
  draggable?: boolean 
}

export const Upload: FC<UploadProps> = (props) => {
  const { 
    defaultFileList, action, beforeUpload, 
    onProgress, onSuccess, onError, 
    onChange, onRemove, headers, 
    name, data, withCredentials,
    accept, multiple, children, draggable
  } = props
  // states
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  // refs:
  // 要点: 必须提供HTMLInputElement数据类型！
  const fileInput = useRef<HTMLInputElement>(null)

  // update file info during uploading
  const updateFileList = (updateFile: UploadFile, updateProps: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(item => {
        // target file
        if (item.uid === updateFile.uid) {
          return {...item, ...updateProps}
        } else {
          return item
        }
      })
    })
  }

  const handleClick = () => {
    if (fileInput.current) {
      // input标签自带的click事件
      fileInput.current.click()
    }
  }

  const uploadFiles = (files: FileList) => {
    // 由于FileList只是一个类数组数据，所以要先将其转换成数组
    let postFiles = Array.from(files)
    postFiles.forEach((file) => {
      if (!beforeUpload) post(file)
      else {
        const result = beforeUpload(file)
        if (result && result instanceof Promise<File>) {
          result.then(processedFile => {
            post(processedFile)
          })
        } else if (result) {
          post(file)
        }
      }
    })
  }

  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'uploaded-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }

    // 当实现多个文件同时上传时，以下code并没拿到上次的fileList，修改如下
    // setFileList([_file, ...fileList])
    setFileList((prevList)=>{
      return [_file, ...prevList]
    })

    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios
      .post(action, formData, {
        headers: {...headers, 'Content-Type': 'multipart/form-data'},
        withCredentials,
        onUploadProgress: (e) => {
          let percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            updateFileList(_file, {percent: percentage, status: 'uploading'})
            if (onProgress) {
              onProgress(percentage, _file)
            }
          }
        },
      })
      .then((res) => {
        updateFileList(_file, {status: 'success', response: res.data})
        if (onSuccess) onSuccess(res.data, _file)
        if (onChange) onChange(_file)
      })
      .catch((err) => {
        updateFileList(_file, {status: 'failure', error: err})
        if (onError) onError(err, _file)
        if (onChange) onChange(_file)
      })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    uploadFiles(files)
    // 清空
    if (fileInput.current) fileInput.current.value = ''
  }

  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) onRemove(file)
  }
  
  return (
    <div className='upload-component'>
      <div className='upload-input'style={{display: 'inline-block'}} onClick={handleClick}>
        {draggable ? 
          <Dragger 
            onFile={(files) => uploadFiles(files)}>
              {children}
          </Dragger> : children
        }
        <input
          className='file-input'
          style={{ display: 'none' }}
          type='file'
          ref={fileInput}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}