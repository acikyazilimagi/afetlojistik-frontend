import * as Yup from 'yup'

export const validationSchema = () =>
  Yup.object().shape({
    fileName: Yup.string().required()
  })
