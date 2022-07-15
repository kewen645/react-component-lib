import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Upload, UploadFile } from './Upload'
import { Icon } from '../Icon/Icon'

export default {
  title: 'Upload',
  component: Upload,
  parameters: {
    docs: {
      description: {
        component: 'Upload file',
      },
    },
  },
} as ComponentMeta<typeof Upload>

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 75 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'failure', percent: 30 },
]

const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 5000) {
    alert('file is too large')
    return false
  }
  return true
}

const filePromise = (file: File) => {
  const newFile = new File([file], file.name, { type: file.type })
  return Promise.resolve(newFile)
}

const Template: ComponentStory<typeof Upload> = (args) => {
  return (
    <Upload
      {...args}
      action='https://jsonplaceholder.typicode.com/posts'
      onProgress={action('progressing')}
      onSuccess={action('successfully uploaded')}
      onError={action('error occurred')}
      defaultFileList={defaultFileList}
      onChange={action('changed')}
      onRemove={action('removed')}
      name='fileName'
      withCredentials
      data={{ key: 'value' }}
      headers={{ 'X-Powered-By': 'rcl' }}
      multiple
      accept='.jpg'
      draggable>
      <Icon icon='upload' size='3x' theme='secondary' />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  )
}

export const SimpleUpload = Template.bind({})
SimpleUpload.args = {
  beforeUpload: checkFileSize,
}

export const UploadWithPromise = Template.bind({})
UploadWithPromise.args = {
  beforeUpload: filePromise,
}
