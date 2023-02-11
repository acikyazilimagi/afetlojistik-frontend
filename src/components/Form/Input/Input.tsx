import { Form, FormItemProps, Input, InputNumber, InputNumberProps, InputProps as AntInputProps } from 'antd'
import { TextAreaProps } from 'antd/lib/input'
import React, { useMemo } from 'react'

const { Item } = Form

import styles from './Input.module.scss'

interface InputEventHandler extends React.ChangeEventHandler<HTMLInputElement> {
  value: string | number
}

type InputMode = 'textarea' | 'number' | undefined
type AdditionalPropsTypes = {
  readonly textarea: TextAreaProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly number: InputNumberProps<any>
}

type InputProps<T extends InputMode> = {
  name: string | (string | number)[] | number
  label?: string
  value?: string
  isTouched?: boolean
  errorMessage?: string
  handleChange?: (e: InputEventHandler) => void
  mode?: T
  format?: string
  disabled?: boolean
  formProps?: FormItemProps
  // @ts-ignore-next-line
  additionalProps?: T extends undefined ? AntInputProps : AdditionalPropsTypes[T]
  setDefaultValue?: boolean
  maxLength?: number
  min?: number
}

export const FormInput = <T extends InputMode = undefined>({
  name,
  label,
  value,
  isTouched,
  errorMessage,
  handleChange,
  mode,
  disabled,
  formProps,
  additionalProps,
  setDefaultValue,
  maxLength,
  min
}: InputProps<T>) => {
  const BaseInputComponent = useMemo(() => {
    switch (mode) {
      case 'textarea':
        return Input.TextArea
      case 'number':
        return InputNumber
      default:
        return Input
    }
  }, [mode])

  return (
    <Item
      help={isTouched && errorMessage}
      className={styles.formItem}
      validateStatus={isTouched && errorMessage ? 'error' : 'success'}
      name={name}
      label={label}
      {...formProps}
    >
      <BaseInputComponent
        min={min}
        value={value}
        className={styles.input + ' ' + (disabled && styles.inputDisabled)}
        {...(setDefaultValue && { defaultValue: value })}
        //@ts-ignore
        onChange={handleChange}
        disabled={disabled}
        maxLength={maxLength}
        {...additionalProps}
      />
    </Item>
  )
}
