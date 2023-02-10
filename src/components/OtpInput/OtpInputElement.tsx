import { Input, InputProps, InputRef } from 'antd'
import { useEffect, useRef } from 'react'
import { usePrevious } from 'hooks/usePrevious'
import styles from './OtpInputElement.module.scss'

type OtpInputElementProps = {
  focus?: boolean
  value?: string | number
} & InputProps

export const OtpInputElement: React.FC<OtpInputElementProps> = ({ value, focus, autoFocus, ...rest }) => {
  const inputRef = useRef<InputRef>(null)
  const prevFocus = usePrevious(!!focus)

  useEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus()
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus()
        inputRef.current.select()
        inputRef.current.select()
      }
    }
  }, [autoFocus, focus, prevFocus])

  return <Input {...rest} value={value} className={styles.otpInputElement} ref={inputRef} />
}
