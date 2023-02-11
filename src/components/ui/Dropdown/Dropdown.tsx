import { Select, SelectProps, Typography } from 'antd'
import React from 'react'
import { replaceTurkishChars } from 'utils/common'
import styles from './Dropdown.module.scss'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DropdownProps = SelectProps<any> & {
  optionClassName?: string
  title?: string
}
export const Dropdown: React.FC<DropdownProps> = ({ title, options, optionClassName, onChange, ...props }) => (
  <div className={styles.dropdown} style={{ border: title ? '1px solid #d4d4d4' : 'none' }}>
    <Typography.Title className={styles.title}>{title}</Typography.Title>
    <Select
      optionFilterProp='children'
      className={
        (props.mode === 'multiple' ? [props.className, styles.maxHeight].join(' ') : props.className) +
        ' ' +
        styles.select
      }
      autoClearSearchValue={props.mode === 'tags'}
      filterOption={(input, option) => {
        const label = replaceTurkishChars(option?.label?.toString().toLowerCase())
        const value = replaceTurkishChars(option?.value?.toString().toLowerCase())
        const inputComparable = replaceTurkishChars(input?.toString().toLowerCase()) + ''
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
  </div>
)
