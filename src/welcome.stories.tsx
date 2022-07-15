import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>Welcome to kewen-rcl</h1>
        <p>it is a just-for-fun project for practice</p>
        <h3>try it!</h3>
        <code>npm install kewen-rcl --save</code>
      </>
    )
  },
  { info: { disable: true } }
)
