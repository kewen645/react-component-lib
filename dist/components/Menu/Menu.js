import React, { createContext, useState } from 'react';
import classNames from 'classnames';
export var menuContext = createContext({ index: '0' });
export var Menu = function (props) {
    var _a;
    var defaultIndex = props.defaultIndex, className = props.className, mode = props.mode, style = props.style, children = props.children, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _b = useState(defaultIndex), currentActive = _b[0], setActive = _b[1];
    // 子组件需要执行的callback
    var handleSelect = function (index) {
        setActive(index);
        if (onSelect)
            onSelect(index);
    };
    // 需要传给子组件的东西
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleSelect,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var menuClass = classNames('menu', className, (_a = {},
        _a["menu-".concat(mode)] = mode,
        _a));
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // 添加一下index属性
                return React.cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error('Warning: Menu has a child that is not a MenuItem component');
            }
        });
    };
    return (React.createElement("ul", { className: menuClass, style: style, "data-testid": 'test-menu' },
        React.createElement(menuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: [],
};
