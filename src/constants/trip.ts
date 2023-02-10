import { t } from 'utils/common'

export enum TripsStatuses {
  Created = 100,
  OnWay = 200,
  Arrived = 300,
  Completed = 400,
  Cancelled = 500
}

export const tripStatusOptions: Record<TripsStatuses, { label: string; value: TripsStatuses }> = {
  [TripsStatuses.Created]: {
    label: t('tripStatuses.created'),
    value: TripsStatuses.Created
  },
  [TripsStatuses.OnWay]: {
    label: t('tripStatuses.onWay'),
    value: TripsStatuses.OnWay
  },
  [TripsStatuses.Arrived]: {
    label: t('tripStatuses.arrived'),
    value: TripsStatuses.Arrived
  },
  [TripsStatuses.Completed]: {
    label: t('tripStatuses.completed'),
    value: TripsStatuses.Completed
  },
  [TripsStatuses.Cancelled]: {
    label: t('tripStatuses.cancelled'),
    value: TripsStatuses.Cancelled
  }
}
