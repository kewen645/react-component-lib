import { FC, ReactNode } from 'react';
declare type TabStyle = 'underline' | 'outline';
export interface TabProps {
    /** activated tab index, default is 0 */
    defaultIndex?: number;
    /** tab style: underline(default) or outline */
    styleType?: TabStyle;
    /** the callback that clicks tab to trigger*/
    onSelect?: (sleectedIndex: number) => void;
    /** extensible className */
    className?: string;
    /** tab content */
    children?: ReactNode;
}
export declare const Tab: FC<TabProps>;
export {};
