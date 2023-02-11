import { EditTripStatusFormType } from 'types/trip'
import { transformResponseData } from 'utils/http'
import { TripStatuses } from 'constants/trip'
import { http } from './http'

export const updateTripStatusToOnWay = async (data: EditTripStatusFormType): Promise<unknown> => {
  const { tripId } = data
  return http.patch(`trip/${tripId}/status/onway`).then(transformResponseData)
}

export const updateTripStatusToArrived = async (data: EditTripStatusFormType): Promise<unknown> => {
  const { tripId } = data
  return http.patch(`trip/${tripId}/status/arrived`).then(transformResponseData)
}

export const updateTripStatusToCancelled = async (data: EditTripStatusFormType): Promise<unknown> => {
  const { tripId } = data
  return http.patch(`trip/${tripId}/status/cancelled`).then(transformResponseData)
}

export const updateTripStatus = async (data: EditTripStatusFormType): Promise<unknown> => {
  switch (Number(data.status)) {
    case TripStatuses.OnWay:
      return updateTripStatusToOnWay(data)
    case TripStatuses.Arrived:
      return updateTripStatusToArrived(data)
    case TripStatuses.Cancelled:
      return updateTripStatusToCancelled(data)
  }
}
