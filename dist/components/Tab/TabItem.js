import React from 'react';
import classNames from 'classnames';
export var TabItem = function (props) {
    var label = props.label, className = props.className, isActive = props.isActive, children = props.children;
    var tabItemClass = classNames('tab-content', className, {
        'tab-content-active': isActive,
    });
    return (React.createElement("div", { key: label, className: tabItemClass }, children));
};
TabItem.defaultProps = {
    disabled: false,
    isActive: false,
};
TabItem.displayName = 'TabItem';
