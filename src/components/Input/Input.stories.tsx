import { Input } from './Input'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    onChange: { action: 'changed' },
  },
  args: {
    style: { width: '300px' },
    prepend: '',
    append: '',
  },
  docs: {
    description: {
      component: 'Input customization',
    },
  },
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const DefaultInput = Template.bind({})
DefaultInput.args = {
  placeholder: 'placeholder',
}

export const InputWithIcon = Template.bind({})
InputWithIcon.args = {
  placeholder: 'input with icon',
  icon: 'search',
}

export const InputWithPrependAndAppend = Template.bind({})
InputWithPrependAndAppend.args = {
  prepend: 'https://',
  defaultValue: 'google',
  append: '.com',
}
