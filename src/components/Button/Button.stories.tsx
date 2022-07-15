import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from './Button'

export default {
  title: 'Buttons',
  component: Button,
  argTypes: { onClick: { action: 'clicked' } },
  docs: {
    description: {
      component: 'Button for forms',
    },
  },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}></Button>

export const DefaultButton = Template.bind({})
DefaultButton.args = {
  btnType: 'default',
  size: 'lg',
  children: 'Default',
}
