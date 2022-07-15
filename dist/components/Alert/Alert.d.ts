import { ReactNode, FC } from 'react';
export declare type AlertType = 'success' | 'primary' | 'warning' | 'danger' | 'default';
export interface AlertProps {
    /** title of alert*/
    title?: string;
    /** closable icon shown or not */
    closable?: boolean;
    /** close icon */
    customClose?: string;
    /** close alert event trigger */
    onClose?: () => void;
    /** descrition of alert */
    children?: ReactNode;
    /** type of alert */
    type: AlertType;
}
export declare const Alert: FC<AlertProps>;
