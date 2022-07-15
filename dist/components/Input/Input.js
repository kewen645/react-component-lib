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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { Icon } from '../Icon/Icon';
import classNames from 'classnames';
export var Input = function (props) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, style = props.style, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "style"]);
    var inputClass = classNames('input-wrapper', (_a = {},
        _a["input-size-".concat(size)] = size,
        _a.disabled = disabled,
        _a['input-group'] = prepend || append,
        _a['input-group-prepend'] = !!prepend,
        _a['input-group-append'] = !!append,
        _a));
    var fixValue = function (value) {
        if (typeof value === 'undefined' || value === null)
            return '';
        return value;
    };
    // 当input的value存在，就要删除input的defaultValue,因为两者不能同时存在
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixValue(props.value);
    }
    return (React.createElement("div", { className: inputClass, style: style },
        prepend && React.createElement("div", { className: 'input-group-prepend' }, prepend),
        icon && (React.createElement("div", { className: 'icon-wrapper' },
            React.createElement(Icon, { icon: icon }))),
        React.createElement("input", __assign({ className: 'input-inner', disabled: disabled }, restProps)),
        append && React.createElement("div", { className: 'input-group-append' }, append)));
};
Input.defaultProps = {
    disabled: false,
};