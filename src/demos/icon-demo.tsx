import Icon from '../components/Icon'

function IconDemo() {
  return (
    <>
      <Icon theme='primary' icon='coffee' size='6x' />
      <Icon theme='danger' icon='arrow-down' size='2x' />
      <Icon theme='success' icon='arrow-down' size='lg' />
      <Icon theme='success' pulse icon='spinner' size='3x' />
    </>
  )
}

export default IconDemo
