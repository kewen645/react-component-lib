var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Dragger } from './Dragger';
import { UploadList } from './UploadList';
export var Upload = function (props) {
    var defaultFileList = props.defaultFileList, action = props.action, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, draggable = props.draggable;
    // states
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    // refs:
    // 要点: 必须提供HTMLInputElement数据类型！
    var fileInput = useRef(null);
    // update file info during uploading
    var updateFileList = function (updateFile, updateProps) {
        setFileList(function (prevList) {
            return prevList.map(function (item) {
                // target file
                if (item.uid === updateFile.uid) {
                    return __assign(__assign({}, item), updateProps);
                }
                else {
                    return item;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            // input标签自带的click事件
            fileInput.current.click();
        }
    };
    var uploadFiles = function (files) {
        // 由于FileList只是一个类数组数据，所以要先将其转换成数组
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload)
                post(file);
            else {
                var result = beforeUpload(file);
                if (result && result instanceof (Promise)) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + 'uploaded-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        // 当实现多个文件同时上传时，以下code并没拿到上次的fileList，修改如下
        // setFileList([_file, ...fileList])
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, _file);
                    }
                }
            },
        })
            .then(function (res) {
            updateFileList(_file, { status: 'success', response: res.data });
            if (onSuccess)
                onSuccess(res.data, _file);
            if (onChange)
                onChange(_file);
        })
            .catch(function (err) {
            updateFileList(_file, { status: 'failure', error: err });
            if (onError)
                onError(err, _file);
            if (onChange)
                onChange(_file);
        });
    };
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files)
            return;
        uploadFiles(files);
        // 清空
        if (fileInput.current)
            fileInput.current.value = '';
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove)
            onRemove(file);
    };
    console.log(fileList);
    return (React.createElement("div", { className: 'upload-component' },
        React.createElement("div", { className: 'upload-input', style: { display: 'inline-block' }, onClick: handleClick },
            draggable ?
                React.createElement(Dragger, { onFile: function (files) { return uploadFiles(files); } }, children) : children,
            React.createElement("input", { className: 'file-input', style: { display: 'none' }, type: 'file', ref: fileInput, onChange: handleFileChange, accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
