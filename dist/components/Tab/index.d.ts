import React from 'react';
import { TabProps } from './Tab';
import { TabItemProps } from './TabItem';
declare type TabComponent = React.FC<TabProps> & {
    Item?: React.FC<TabItemProps>;
};
declare const TransTab: TabComponent;
export default TransTab;
