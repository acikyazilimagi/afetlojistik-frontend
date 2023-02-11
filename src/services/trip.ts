import { EditTripStatusFormType } from 'types/trip'
import { transformResponseData } from 'utils/http'
import { TripsStatuses } from 'constants/trip'
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
    case TripsStatuses.OnWay:
      return updateTripStatusToOnWay(data)
    case TripsStatuses.Arrived:
      return updateTripStatusToArrived(data)
    case TripsStatuses.Cancelled:
      return updateTripStatusToCancelled(data)
  }
}
