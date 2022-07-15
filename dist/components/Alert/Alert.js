import React, { useState } from 'react';
import classNames from 'classnames';
import { Icon } from '../Icon/Icon';
import { Transition } from '../Transition/Transition';
export var Alert = function (props) {
    var _a;
    var title = props.title, closable = props.closable, customClose = props.customClose, onClose = props.onClose, children = props.children, type = props.type;
    var alertClass = classNames('alert', (_a = {},
        _a["alert-".concat(type)] = type,
        _a));
    var _b = useState(true), visible = _b[0], setVisible = _b[1];
    var customCloseP = customClose || React.createElement(Icon, { icon: 'times', className: 'window-close', size: 'lg' });
    var handleClick = function () {
        setVisible(false);
        if (onClose)
            onClose();
    };
    return (React.createElement(Transition, { in: visible, timeout: 300, animation: 'zoom-in-left', wrapper: true },
        React.createElement("div", { className: alertClass },
            title ? React.createElement("h4", { className: 'alert-title' }, title) : null,
            React.createElement("p", { className: 'alert-message' }, children),
            closable ? React.createElement("i", { onClick: handleClick }, customCloseP) : null)));
};
Alert.defaultProps = {
    closable: true,
    type: 'primary',
};
