import { AutoComplete, AutoCompleteProps, DataSourceType } from './AutoComplete'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { config } from 'react-transition-group'

config.disabled = true

const testArray = [
  { id: '1', value: 'tom' },
  { id: '2', value: 'jack' },
  { id: '3', value: 'mike' },
  { id: '4', value: 'mary' },
]

const testProps: AutoCompleteProps = {
  fetchSuggestion: (query: string) => {
    return testArray.filter((item) => item.value.includes(query))
  },
  onSelect: jest.fn(),
  placeholder: 'auto-completed',
}

const testProps2: AutoCompleteProps = {
  fetchSuggestion: (query: string) => {
    return testArray.filter((item) => item.value.includes(query))
  },
  onSelect: jest.fn(),
  placeholder: 'auto-completed',
  renderOption: (item: DataSourceType<{ id?: string }>) => (
    <span>
      {item.id}-{item.value}
    </span>
  ),
}

describe('testing AutoComplete component', () => {
  it('test basic AutoComplete component', async () => {
    const view = render(<AutoComplete {...testProps}></AutoComplete>)
    const inputNode = screen.getByPlaceholderText('auto-completed') as HTMLInputElement
    userEvent.type(inputNode, 'a')
    await waitFor(() => {
      expect(screen.getByText('jack')).toBeInTheDocument()
    })
    // should have two matched suggestions
    expect(view.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    // click the first one
    userEvent.click(screen.getByText('jack'))
    expect(testProps.onSelect).toHaveBeenCalledWith({ id: '2', value: 'jack' })
    expect(screen.queryByText('jack')).not.toBeInTheDocument()
    expect(inputNode.value).toBe('jack')
  })

  // You should use userEvent.keyboard if you want to just simulate pressing buttons on the keyboard.
  // You should use userEvent.type if you just want to conveniently insert some text into an input field or textarea.
  it('should provide keyboard support', async () => {
    render(<AutoComplete {...testProps}></AutoComplete>)
    const inputNode = screen.getByPlaceholderText('auto-completed') as HTMLInputElement
    userEvent.type(inputNode, 'a')
    await waitFor(() => {
      expect(screen.getByText('jack')).toBeInTheDocument()
    })
    const firstResult = screen.getByText('jack')
    const secondResult = screen.getByText('mary')

    // 一开始没任何highlight，按了方向键才有
    userEvent.keyboard('{arrowdown}')
    expect(firstResult).toHaveClass('active')

    userEvent.keyboard('{arrowdown}')
    expect(secondResult).toHaveClass('active')

    userEvent.keyboard('{arrowup}')
    expect(firstResult).toHaveClass('active')

    userEvent.keyboard('{enter}')
    expect(testProps.onSelect).toHaveBeenCalledWith({ id: '2', value: 'jack' })
    expect(screen.queryByText('jack')).not.toBeInTheDocument()
    expect(screen.queryByText('mary')).not.toBeInTheDocument()
  })

  it('click outside and the dropdown is hidden', async () => {
    render(<AutoComplete {...testProps}></AutoComplete>)
    const inputNode = screen.getByPlaceholderText('auto-completed') as HTMLInputElement
    userEvent.type(inputNode, 'a')
    await waitFor(() => {
      expect(screen.getByText('jack')).toBeInTheDocument()
    })

    userEvent.click(document.body)
    expect(screen.queryByText('jack')).not.toBeInTheDocument()
    expect(screen.queryByText('mary')).not.toBeInTheDocument()
  })

  it('renderOption should generate the template', async () => {
    const view = render(<AutoComplete {...testProps2}></AutoComplete>)
    const inputNode = screen.getByPlaceholderText('auto-completed') as HTMLInputElement
    userEvent.type(inputNode, 'a')
    await waitFor(() => {
      expect(screen.getByText('2-jack')).toBeInTheDocument()
    })
    expect(view.container.querySelectorAll('.suggestion-item').length).toEqual(2)
  })
})
