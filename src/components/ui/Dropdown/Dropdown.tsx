import { Select, SelectProps } from 'antd'
import React from 'react'
import styles from './Dropdown.module.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DropdownProps = SelectProps<any> & {
  optionClassName?: string
}
export const Dropdown: React.FC<DropdownProps> = ({ options, optionClassName, onChange, ...props }) => (
  <Select
    optionFilterProp='children'
    className={props.mode === 'multiple' ? [props.className, styles.maxHeight].join(' ') : props.className}
    autoClearSearchValue={props.mode === 'tags'}
    filterOption={(input, option) => {
      const label = option?.label?.toString().toLowerCase()
      const value = option?.value?.toString().toLowerCase()
      const inputComparable = input?.toString().toLowerCase()
      return Boolean((label && label.indexOf(inputComparable) >= 0) || (value && value.indexOf(inputComparable) >= 0))
    }}
    onChange={(value, option) => {
      if ((props.mode === 'multiple' || props.mode === 'tags') && value.length === 0 && onChange) {
        onChange(undefined, option)
      } else if (onChange) {
        onChange(value, option)
      }
    }}
    {...props}
  >
    {options?.map((option) => (
      <Select.Option
        value={option.value}
        key={option.value}
        label={option.label}
        className={optionClassName}
        disabled={option.disabled}
      >
        {option.customRender || option.label}
      </Select.Option>
    ))}
  </Select>
)
