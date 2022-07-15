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
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { menuContext } from './Menu';
import { Icon } from '../Icon/Icon';
import { Transition } from '../Transition/Transition';
// 整个子菜单
export var SubMenu = function (props) {
    var context = useContext(menuContext);
    var openedSubMenus = context.defaultOpenSubMenus;
    // 此index是menu组件传过来的active的index
    var index = props.index, title = props.title, className = props.className, children = props.children;
    var isOpen = index && context.mode === 'vertical' ? openedSubMenus.includes(index) : false;
    var _a = useState(isOpen), menuOpen = _a[0], setOpen = _a[1];
    var subMenuClass = classNames('menu-item', 'submenu-item', className, {
        active: context.index === index,
        'is-vertical': context.mode === 'vertical',
        'is-open': menuOpen,
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    // vertical时，需要点击展开菜单
    // horizontal时，不需要点击
    var clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {};
    var hoverEvents = context.mode !== 'vertical'
        ? {
            onMouseEnter: function (e) {
                handleMouse(e, true);
            },
            onMouseLeave: function (e) {
                handleMouse(e, false);
            },
        }
        : {};
    // 子菜单里面的每一项
    var renderChildren = function () {
        var childrenClass = classNames('submenu', {
            'menu-opened': menuOpen,
        });
        var childrenComponents = React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i),
                });
            }
            else {
                console.error('Warning: Submenu has a child that is not a MenuItem component');
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: 'zoom-in-bottom' },
            React.createElement("ul", { className: childrenClass }, childrenComponents)));
    };
    return (
    // 直接解构赋值替换原有的方法
    React.createElement("li", __assign({ key: index, className: subMenuClass }, hoverEvents),
        React.createElement("div", __assign({ className: 'submenu-title' }, clickEvents),
            title,
            React.createElement(Icon, { icon: 'angle-down', className: 'arrow-icon' })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
