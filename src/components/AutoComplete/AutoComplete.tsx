import React, {
  FC,
  useState,
  ChangeEvent,
  ReactElement,
  KeyboardEvent,
  useEffect,
  useRef,
} from 'react'
import { Input, InputProps } from '../Input/Input'
import { useDebounce } from '../../hooks/useDebounce'
import { useClickOutside } from '../../hooks/useClickOutside'
import { Transition } from '../Transition/Transition'
import { Icon } from '../Icon/Icon'
import classNames from 'classnames'

interface DataSourceObject {
  value: string
}
export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  //** user suggestion */
  fetchSuggestion: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  /** once selected, it would be on the target input element */
  onSelect?: (item: DataSourceType) => void
  /** renderOption that is used to render different styles */
  renderOption?: (item: DataSourceType) => ReactElement
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  // props
  const { fetchSuggestion, onSelect, value, renderOption, ...restProps } = props
  // states
  const [inputVal, setInputVal] = useState(value as string)
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const [showDropdown, setShowDropdown] = useState(false)
  // refs
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)

  // hooks
  // delay时间不宜过长，否则测试有问题
  const debounceVal = useDebounce(inputVal, 500)
  useClickOutside(componentRef, () => setSuggestions([]))

  useEffect(() => {
    if (debounceVal && triggerSearch.current) {
      const results = fetchSuggestion(debounceVal)
      if (results instanceof Promise) {
        console.log('triggered')
        setLoading(true)
        results.then((data) => {
          setLoading(false)
          setSuggestions(data)
          if (data.length > 0) setShowDropdown(true)
        })
      } else {
        setSuggestions(results)
        if (results.length > 0) setShowDropdown(true)
      }
    } else {
      setSuggestions([])
      setShowDropdown(false)
    }
    setHighlightIndex(-1)
  }, [debounceVal, fetchSuggestion])

  const highlight = (index: number) => {
    if (index <= 0) index = 0
    if (index >= suggestions.length) index = suggestions.length - 1
    setHighlightIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        highlight(highlightIndex - 1)
        break
      case 'ArrowDown':
        highlight(highlightIndex + 1)
        break
      case 'Enter':
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 'ArrowLeft':
        break
      case 'Escape':
        setShowDropdown(false)
        break
      default:
        break
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputVal(value)
    triggerSearch.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputVal(item.value)
    setShowDropdown(false)
    if (onSelect) onSelect(item)
    // 从suggestions中选择后，标记它使其不能再次触发查找
    triggerSearch.current = false
  }

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation='zoom-in-top'
        timeout={300}
        onExited={() => {
          setSuggestions([])
        }}>
        <ul className='suggestion-list'>
          {loading && (
            <div className='suggestions-loading-icon'>
              <Icon icon='spinner' spin />
            </div>
          )}

          {suggestions.map((item, index) => {
            const highlightClass = classNames('suggestion-item', {
              active: index === highlightIndex,
            })
            return (
              <li key={index} className={highlightClass} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }

  return (
    <div className='auto-complete' ref={componentRef}>
      <Input value={inputVal} onChange={handleChange} onKeyDown={handleKeyDown} {...restProps} />
      {suggestions.length > 0 && generateDropdown()}
    </div>
  )
}
