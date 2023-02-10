import { Form, FormItemProps, InputProps } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { OtpInputElement } from './OtpInputElement'
import styles from './OtpInput.module.scss'

const { Item } = Form

type OtpInputProps = {
  length: number // Number of inputs
  onChangeValue: (otp: string) => void
  handleAutoSubmit?: () => void

  autoFocus?: boolean // Auto focus to input programmatically
  isNumberInput?: boolean
  disabled?: boolean

  formProps?: FormItemProps
  inputProps?: InputProps
  name: string
  value?: string
  isTouched?: boolean
  errorMessage?: string
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length,
  isNumberInput,
  autoFocus,
  disabled,
  onChangeValue,
  handleAutoSubmit,
  formProps,
  inputProps,
  value,
  name,
  isTouched,
  errorMessage
}) => {
  const [activeInput, setActiveInput] = useState(0)

  const otpValues = useMemo(() => value?.split('') ?? Array<string>(length).fill(''), [value, length])

  // const [otpValues, setOTPValues] = useState(value?.split('') ?? Array<string>(length).fill(''))

  useEffect(() => {
    if (handleAutoSubmit) {
      const hasAllFields = otpValues.filter((value) => value).length === length
      if (hasAllFields) {
        handleAutoSubmit()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpValues, length])

  const handleOtpChange = useCallback(
    (otp: string[]) => {
      const otpValue = otp.join('')
      onChangeValue(otpValue)
    },
    [onChangeValue]
  )

  // Helper to return value with the right type: 'text' or 'number'
  const getRightValue = useCallback(
    (str: string) => {
      let changedValue = str

      if (!isNumberInput || !changedValue) {
        return changedValue
      }

      return Number(changedValue) >= 0 ? changedValue : ''
    },
    [isNumberInput]
  )

  // Change OTP value at focussing input
  const changeCodeAtFocus = useCallback(
    (str: string) => {
      const updatedOTPValues = [...otpValues]
      updatedOTPValues[activeInput] = str[0] || ''
      // setOTPValues(updatedOTPValues)
      handleOtpChange(updatedOTPValues)
    },
    [activeInput, handleOtpChange, otpValues]
  )

  // Focus `inputIndex` input
  const focusInput = useCallback(
    (inputIndex: number) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0)
      setActiveInput(selectedIndex)
    },
    [length]
  )

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1)
  }, [activeInput, focusInput])

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1)
  }, [activeInput, focusInput])

  const handleOnFocus = useCallback(
    (index: number) => () => {
      focusInput(index)
    },
    [focusInput]
  )

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = getRightValue(e.currentTarget.value)
      if (!val) {
        e.preventDefault()
        return
      }
      changeCodeAtFocus(val)
      focusNextInput()
    },
    [changeCodeAtFocus, focusNextInput, getRightValue]
  )

  const onBlur = useCallback(() => {
    setActiveInput(-1)
  }, [])

  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const pressedKey = e.key

      switch (pressedKey) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault()
          if (otpValues[activeInput]) {
            changeCodeAtFocus('')
          } else {
            focusPrevInput()
          }
          break
        }
        case 'ArrowLeft': {
          e.preventDefault()
          focusPrevInput()
          break
        }
        case 'ArrowRight': {
          e.preventDefault()
          focusNextInput()
          break
        }
        default: {
          if (pressedKey.match(/^[^a-zA-Z0-9]$/)) {
            e.preventDefault()
          }

          break
        }
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
  )

  const handleOnPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pastedData = e.clipboardData
        .getData('text/plain')
        .trim()
        .slice(0, length - activeInput)
        .split('')
      if (pastedData) {
        let nextFocusIndex = 0
        const updatedOTPValues = [...otpValues]
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(pastedData.shift() || val)
            if (changedValue) {
              updatedOTPValues[index] = changedValue
              nextFocusIndex = index
            }
          }
        })
        // setOTPValues(updatedOTPValues)
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1))
        handleOtpChange(updatedOTPValues)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeInput, getRightValue, length, otpValues]
  )

  return (
    <Item
      help={isTouched && errorMessage}
      validateStatus={isTouched && errorMessage ? 'error' : 'success'}
      name={name}
      {...formProps}
      className={styles.otpInputFormItem}
    >
      <div className={styles.otpInput}>
        {Array<string>(length)
          .fill('')
          .map((_, index) => (
            <OtpInputElement
              {...inputProps}
              size='large'
              key={`otp-input-el-${index}`}
              type={isNumberInput ? 'number' : 'text'}
              focus={activeInput === index}
              value={otpValues[index]}
              autoFocus={autoFocus}
              onFocus={handleOnFocus(index)}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              onBlur={onBlur}
              onPaste={handleOnPaste}
              disabled={disabled}
            />
          ))}
      </div>
    </Item>
  )
}
