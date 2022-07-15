import React, { FC } from 'react';
export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
    children?: React.ReactNode;
}
export declare const SubMenu: FC<SubMenuProps>;
