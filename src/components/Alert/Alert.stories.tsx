import { Alert } from './Alert'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Alert',
  component: Alert,
  args: {
    closable: true,
  },
  parameters: {
    docs: {
      description: {
        component: 'Alert Component for pop-up',
      },
    },
  },
} as ComponentMeta<typeof Alert>

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />
export const defaultAlert = Template.bind({})
defaultAlert.args = {
  title: 'this is default alert',
  type: 'primary',
}

export const alertWithChildren = Template.bind({})
alertWithChildren.args = {
  title: 'this is alert with Children',
  type: 'primary',
  children: 'this is a very long description',
}
