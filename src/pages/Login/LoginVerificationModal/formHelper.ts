import * as Yup from 'yup'
import { VerifyAuthCodeFormType } from 'types/otp'

export const validationSchema = () =>
  Yup.object().shape({
    phone: Yup.number().required(),
    otpCode: Yup.string().required().min(6)
  })

export const initialValues: VerifyAuthCodeFormType = {
  phone: undefined,
  otpCode: undefined
}
