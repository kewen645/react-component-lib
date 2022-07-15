import { useState, useEffect } from 'react';
export function useDebounce(value, delay) {
    if (delay === void 0) { delay = 1000; }
    var _a = useState(value), debounceVal = _a[0], setDebounceVal = _a[1];
    // useEffect中提供清除函数，每次出现变动时，就会先清除上一次，然后再跑今次
    useEffect(function () {
        var timer = setTimeout(function () {
            setDebounceVal(value);
        }, delay);
        // 清除函数
        return function () { return clearTimeout(timer); };
    }, [value, delay]);
    return debounceVal;
}
