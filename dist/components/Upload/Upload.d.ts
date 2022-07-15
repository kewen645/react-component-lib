import { FC, ReactNode } from 'react';
export declare type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'failure';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /** */
    defaultFileList?: UploadFile[];
    /**  the action to fire, where to upload */
    action: string;
    /** beforeUpload used to do restrictions for files eg: check size */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /**  progress callback */
    onProgress?: (percentage: number, file: UploadFile) => void;
    /**  success callback */
    onSuccess?: (data: any, file: UploadFile) => void;
    /**  error callback */
    onError?: (err: any, file: UploadFile) => void;
    /** display file uploading process state */
    onChange?: (file: UploadFile) => void;
    /** remove items from upload file list*/
    onRemove?: (file: UploadFile) => void;
    /** customized headers */
    headers?: {
        [key: string]: any;
    };
    /** file name u want */
    name?: string;
    /** multiple form data allowed */
    data?: {
        [key: string]: any;
    };
    /** credentials for file upload, cookie allowed */
    withCredentials?: boolean;
    /** uploading file type acceptance*/
    accept?: string;
    /** multiple file uploading allowed */
    multiple?: boolean;
    /** the button content */
    children?: ReactNode;
    /** file is draggable to upload */
    draggable?: boolean;
}
export declare const Upload: FC<UploadProps>;
