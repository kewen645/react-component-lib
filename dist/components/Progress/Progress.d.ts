import { FC, CSSProperties } from 'react';
import { ThemeProps } from '../Icon/Icon';
export interface ProgressProps {
    /** percentage to be shown */
    percent: number;
    /** the height of loading bar */
    strokeHeight?: number;
    /** set the text to be shown or not */
    showText?: boolean;
    /** user customized style */
    styles?: CSSProperties;
    /** theme to choose */
    theme?: ThemeProps;
}
export declare const Progress: FC<ProgressProps>;
