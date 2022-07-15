import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button, ButtonProps } from './Button'

// 封装在一个对象内，这样更好地管理所需测试的属性
const defaultProps = {
  onClick: jest.fn(),
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'klass',
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('test Button component', () => {
  it('should render default button correctly', () => {
    render(<Button {...defaultProps}>DEFAULT</Button>)
    const element = screen.getByText('DEFAULT') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeFalsy()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    userEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render button based on diff props', () => {
    render(<Button {...testProps}>DIFFERENT PROPS</Button>)
    const element = screen.getByText('DIFFERENT PROPS')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-primary btn-lg klass')
  })
  it('should render a link correctly when btnType is link and href is provided', () => {
    render(
      <Button btnType='link' href='https://www.google.com'>
        LINK BUTTON
      </Button>
    )
    const element = screen.getByText('LINK BUTTON')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveAttribute('href')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button if disabled prop is present', () => {
    render(<Button {...disabledProps}>DISABLED BUTTON</Button>)
    const element = screen.getByText('DISABLED BUTTON') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    userEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
