import { FC, ReactNode } from 'react';
export interface TabItemProps {
    /** tab label content */
    label: any;
    /** extensible className */
    className?: string;
    /** tab flag for activation */
    isActive?: boolean;
    /** disable tab */
    disabled?: boolean;
    /** tab content */
    children?: ReactNode;
}
export declare const TabItem: FC<TabItemProps>;
