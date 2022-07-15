import React, { useContext } from 'react';
import { menuContext } from './Menu';
import classNames from 'classnames';
export var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(menuContext);
    var menuItemClass = classNames('menu-item', className, {
        disabled: disabled,
        active: index === context.index && !disabled,
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && typeof index === 'string') {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { className: menuItemClass, style: style, onClick: handleClick }, children));
};
MenuItem.displayName = 'MenuItem';
