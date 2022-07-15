import '../src/styles/index.scss'
import { withConsole } from '@storybook/addon-console'
import { addParameters } from '@storybook/react'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const wrapperStyle = {
  padding: '20px 40px'
}

export const decorators = [
  (Story, context) => withConsole()(Story)(context),
  (Story) => (
    <div style={wrapperStyle}>
      <h3>Component Representation</h3>
      <Story />
    </div>
  )
]