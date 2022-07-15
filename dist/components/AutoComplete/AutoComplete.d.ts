import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/Input';
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestion: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** once selected, it would be on the target input element */
    onSelect?: (item: DataSourceType) => void;
    /** renderOption that is used to render different styles */
    renderOption?: (item: DataSourceType) => ReactElement;
}
export declare const AutoComplete: FC<AutoCompleteProps>;
export {};
