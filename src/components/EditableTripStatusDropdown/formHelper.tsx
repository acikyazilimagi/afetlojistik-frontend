import * as Yup from 'yup'
import { EditTripStatusFormType } from 'types/trip'

export const editTripStatusInitialValues: EditTripStatusFormType = {
  tripId: undefined,
  status: undefined
}

export const validationSchema = () =>
  Yup.object().shape({
    tripId: Yup.string().required(),
    status: Yup.number().required()
  })
