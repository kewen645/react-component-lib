import { Tab } from '../components/Tab/Tab'
import { TabItem } from '../components/Tab/TabItem'

function TabDemo() {
  return (
    <>
      <Tab defaultIndex={0} styleType='underline' onSelect={() => {}}>
        <TabItem label='card1'>this is card one</TabItem>
        <TabItem label='card2'>this is content two</TabItem>
        <TabItem label='disabled' disabled={true}>
          this is content three
        </TabItem>
      </Tab>
      <hr />
      <Tab defaultIndex={0} styleType='outline' onSelect={() => {}}>
        <TabItem label='card1'>this is card one</TabItem>
        <TabItem label='card2'>this is content two</TabItem>
        <TabItem label='disabled' disabled={true}>
          this is content three
        </TabItem>
      </Tab>
    </>
  )
}

export default TabDemo
