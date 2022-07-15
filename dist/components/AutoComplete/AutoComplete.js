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
import React, { useState, useEffect, useRef, } from 'react';
import { Input } from '../Input/Input';
import { useDebounce } from '../../hooks/useDebounce';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Transition } from '../Transition/Transition';
import { Icon } from '../Icon/Icon';
import classNames from 'classnames';
export var AutoComplete = function (props) {
    // props
    var fetchSuggestion = props.fetchSuggestion, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props
    // states
    , ["fetchSuggestion", "onSelect", "value", "renderOption"]);
    // states
    var _a = useState(value), inputVal = _a[0], setInputVal = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var _e = useState(false), showDropdown = _e[0], setShowDropdown = _e[1];
    // refs
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    // hooks
    // delay时间不宜过长，否则测试有问题
    var debounceVal = useDebounce(inputVal, 500);
    useClickOutside(componentRef, function () { return setSuggestions([]); });
    useEffect(function () {
        if (debounceVal && triggerSearch.current) {
            var results = fetchSuggestion(debounceVal);
            if (results instanceof Promise) {
                console.log('triggered');
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length > 0)
                        setShowDropdown(true);
                });
            }
            else {
                setSuggestions(results);
                if (results.length > 0)
                    setShowDropdown(true);
            }
        }
        else {
            setSuggestions([]);
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
    }, [debounceVal, fetchSuggestion]);
    var highlight = function (index) {
        if (index <= 0)
            index = 0;
        if (index >= suggestions.length)
            index = suggestions.length - 1;
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.key) {
            case 'ArrowUp':
                highlight(highlightIndex - 1);
                break;
            case 'ArrowDown':
                highlight(highlightIndex + 1);
                break;
            case 'Enter':
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 'ArrowLeft':
                break;
            case 'Escape':
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputVal(value);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputVal(item.value);
        setShowDropdown(false);
        if (onSelect)
            onSelect(item);
        // 从suggestions中选择后，标记它使其不能再次触发查找
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, animation: 'zoom-in-top', timeout: 300, onExited: function () {
                setSuggestions([]);
            } },
            React.createElement("ul", { className: 'suggestion-list' },
                loading && (React.createElement("div", { className: 'suggestions-loading-icon' },
                    React.createElement(Icon, { icon: 'spinner', spin: true }))),
                suggestions.map(function (item, index) {
                    var highlightClass = classNames('suggestion-item', {
                        active: index === highlightIndex,
                    });
                    return (React.createElement("li", { key: index, className: highlightClass, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
                }))));
    };
    return (React.createElement("div", { className: 'auto-complete', ref: componentRef },
        React.createElement(Input, __assign({ value: inputVal, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        suggestions.length > 0 && generateDropdown()));
};
