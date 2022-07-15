import { Input, InputProps } from './Input'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input',
}

describe('Test Input component', () => {
  it('should render the corrent default input', () => {
    render(<Input {...defaultProps} />)
    const element = screen.getByPlaceholderText('test-input') as HTMLInputElement
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('input-inner')
    // type sth into the input element
    userEvent.type(element, 'abc')
    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(element.value).toEqual('abc')
  })
  it('should render the disabled input', () => {
    render(<Input disabled {...defaultProps} />)
    const element = screen.getByPlaceholderText('test-input') as HTMLInputElement
    expect(element).toBeDisabled()
  })
  it('should render different input size based on size property', () => {
    const { container } = render(<Input size='lg' {...defaultProps} />)
    const testContainer = container.querySelector('.input-wrapper')
    expect(testContainer).toHaveClass('input-size-lg')
  })
  it('should render prepend and append elements based on prepend/append property', () => {
    const { container } = render(<Input prepend='https://' append='.com' {...defaultProps} />)
    const testContainer = container.querySelector('.input-wrapper')
    expect(testContainer).toHaveClass('input-group input-group-prepend input-group-append')
    expect(screen.getByText('https://')).toBeInTheDocument()
    expect(screen.getByText('.com')).toBeInTheDocument()
  })
})
