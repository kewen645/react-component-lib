import React, { useState } from 'react';
import className from 'classnames';
export var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDrageOver = _a[1];
    var draggerClass = className('upload-dragger', {
        'is-dragover': dragOver,
    });
    var handleDrag = function (e, over) {
        e.preventDefault();
        setDrageOver(over);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setDrageOver(false);
        onFile(e.dataTransfer.files);
    };
    return (React.createElement("div", { className: draggerClass, onDragOver: function (e) { return handleDrag(e, true); }, onDragLeave: function (e) { return handleDrag(e, false); }, onDrop: handleDrop }, children));
};
