import React, { useState, Children, cloneElement, } from 'react';
import classNames from 'classnames';
export var Tab = function (props) {
    var className = props.className, styleType = props.styleType, children = props.children, onSelect = props.onSelect;
    var tabClass = classNames('tab-nav', className, {
        'tab-underline': styleType === 'underline',
        'tab-outline': styleType === 'outline',
    });
    var _a = useState(0), activeIndex = _a[0], setActiveIndex = _a[1];
    var handleClick = function (index, disabled) {
        if (disabled)
            return;
        setActiveIndex(index);
        if (typeof onSelect === 'function') {
            onSelect(index);
        }
    };
    var childrenComponent = function () {
        return Children.map(children, function (child, index) {
            var childElement = child;
            var isLabelDisabled = childElement.props.disabled ? childElement.props.disabled : false;
            var tabLabelClass = classNames('tab-label', {
                'tab-label-active': activeIndex === index,
                'tab-label-disabled': childElement.props.disabled,
            });
            var handleChildClick = function () { return handleClick(index, isLabelDisabled); };
            return (React.createElement("li", { key: index, className: tabLabelClass, onClick: handleChildClick }, childElement.props.label));
        });
    };
    var renderChildren = function () {
        return Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'TabItem') {
                return cloneElement(childElement, {
                    isActive: activeIndex === index,
                });
            }
            else {
                console.error('Warning: Tab Component has a child that is not a TabItem component');
            }
        });
    };
    return (React.createElement("div", null,
        React.createElement("nav", { className: tabClass },
            React.createElement("ul", { className: 'tab-ul' }, childrenComponent())),
        renderChildren()));
};
Tab.defaultProps = {
    defaultIndex: 0,
    styleType: 'underline',
};
