import { ComponentMeta } from '@storybook/react'
import { Progress } from './Progress'

export default {
  title: 'Progress',
  component: Progress,
} as ComponentMeta<typeof Progress>

export const defaultProgress = () => <Progress percent={20} />
export const withTextProgress = () => <Progress percent={50} showText={false} />
export const strokeHeightProgress = () => <Progress percent={30} strokeHeight={50} />
