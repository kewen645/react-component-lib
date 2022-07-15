import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tab, TabProps } from './Tab'
import { TabItem } from './TabItem'

const testProps: TabProps = {
  defaultIndex: 0,
  styleType: 'underline',
  onSelect: jest.fn(),
}

const generateTab = (props: TabProps) => {
  return (
    <Tab {...props}>
      <TabItem label='card1'>this is card one</TabItem>
      <TabItem label='card2'>this is card two</TabItem>
      <TabItem label='disabled' disabled>
        this is card three
      </TabItem>
    </Tab>
  )
}

const createStyleFile = () => {
  const css = `
    .tab-content {
      display: none;
    }
    .tab-content.tab-content-avtive {
      display: block
    }
  `
  const style = document.createElement('style')
  style.innerHTML = css
  return style
}

const setup = (scenario: TabProps) => render(generateTab(scenario))

describe('test Tab and TabItem component in default(underline) mode', () => {
  it('should render correct tab and tabitem based on default props', () => {
    const style = createStyleFile()
    setup(testProps).container.append(style)
    const activeLabel = screen.getByText('card1')
    const activeContent = screen.getByText('this is card one')
    expect(activeLabel).toHaveClass('tab-label tab-label-active')
    expect(activeContent).toBeInTheDocument()
    const label2 = screen.getByText('card2')
    userEvent.click(label2)
    const content2 = screen.getByText('this is card two')
    expect(activeContent).not.toBeVisible()
    expect(content2).toBeInTheDocument()
    const label3 = screen.getByText('disabled')
    userEvent.click(label3)
    const content3 = screen.getByText('this is card three')
    expect(content3).not.toBeVisible()
  })
})
