import { EditTripStatusFormType } from 'types/trip'
import { transformResponseData } from 'utils/http'
import { http } from './http'

export const updateTripStatus = async (data: EditTripStatusFormType): Promise<unknown> => {
  const { tripId, status } = data
  return http.patch(`trip/${tripId}`, { status: parseInt(status!.toString()) }).then(transformResponseData)
}
