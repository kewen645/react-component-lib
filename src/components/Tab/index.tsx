import React from 'react'
import { Tab, TabProps } from './Tab'
import { TabItem, TabItemProps } from './TabItem'

// 交叉类型
type TabComponent = React.FC<TabProps> & {
  Item?: React.FC<TabItemProps>
}

const TransTab: TabComponent = Tab
TransTab.Item = TabItem

export default TransTab
