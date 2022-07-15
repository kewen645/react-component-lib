import { useState, useEffect } from 'react'
export function useDebounce(value: any, delay: number = 1000) {
  const [debounceVal, setDebounceVal] = useState(value)
  // useEffect中提供清除函数，每次出现变动时，就会先清除上一次，然后再跑今次
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(value)
    }, delay)
    // 清除函数
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounceVal
}
