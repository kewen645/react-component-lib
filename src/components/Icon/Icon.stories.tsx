import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Icon } from './Icon'

export default {
  title: 'Icons',
  component: Icon,
  docs: {
    description: {
      component: 'Icon customization',
    },
  },
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />

export const DefaultIcon = Template.bind({})
DefaultIcon.args = {
  size: '2x',
  icon: 'coffee',
}

export const IconWithAnimation = Template.bind({})
IconWithAnimation.args = {
  size: '2x',
  icon: 'spinner',
  spin: true,
}
