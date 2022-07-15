import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Alert, AlertProps } from './Alert'

const testAlertProp: AlertProps = {
  title: 'testAlert',
  closable: true,
  customClose: 'times',
  type: 'primary',
}

describe('test Alert component', () => {
  it('should render the correct default Alert', async () => {
    render(<Alert {...testAlertProp}>Nice</Alert>)
    const element = screen.getByText('Nice')

    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('P')
    expect(element).toHaveClass('alert-message')
    expect(element.parentNode).toHaveClass('alert alert-primary')

    const titleElement = screen.getByText('testAlert')
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveClass('alert-title')
    expect(titleElement.parentNode).toBe(element.parentNode)

    const iconElement = screen.getByText('times')
    userEvent.click(iconElement)
    await waitFor(() => {
      expect(element).not.toBeInTheDocument()
    })
  })
})
