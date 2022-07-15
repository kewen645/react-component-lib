import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Tab, TabProps } from './Tab'
import { TabItem } from './TabItem'
import { Icon } from '../Icon/Icon'

const testTabProps: TabProps = {
  onSelect: () => console.log('selected'),
}

export default {
  title: 'Tab',
  component: Tab,
  parameters: {
    controls: { hideNoControlsWarning: true },
    docs: {
      description: {
        component: 'Tab display',
      },
    },
  },
} as ComponentMeta<typeof Tab>

export const defaultTab: ComponentStory<typeof Tab> = () => (
  <Tab {...testTabProps}>
    <TabItem label='card1'>this is content one</TabItem>
    <TabItem label='card2'>this is content two</TabItem>
    <TabItem label='card3'>this is content three</TabItem>
  </Tab>
)

export const tabWithOutline: ComponentStory<typeof Tab> = () => (
  <Tab {...testTabProps} styleType='outline'>
    <TabItem label='card1'>this is content one</TabItem>
    <TabItem label='card2'>this is content two</TabItem>
    <TabItem label='card3' disabled>
      this is content three
    </TabItem>
  </Tab>
)

export const tabWithCustomIcon: ComponentStory<typeof Tab> = () => (
  <Tab {...testTabProps} styleType='outline'>
    <TabItem label={<Icon icon='exclamation-circle' />}>this is content one</TabItem>
    <TabItem label='card2'>this is content two</TabItem>
  </Tab>
)
