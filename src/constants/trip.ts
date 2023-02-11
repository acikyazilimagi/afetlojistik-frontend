import i18n from 'i18n'

export enum TripsStatuses {
  Created = 100,
  OnWay = 200,
  Arrived = 300,
  // WILL BE DEPRECATED
  Completed = 400,
  Cancelled = 500
}

export const tripStatusOptions: Record<TripsStatuses, { label: string; value: TripsStatuses; color?: string }> = {
  [TripsStatuses.Created]: {
    label: i18n.t('tripStatuses.created'),
    value: TripsStatuses.Created,
    color: '#007787'
  },
  [TripsStatuses.OnWay]: {
    label: i18n.t('tripStatuses.onWay'),
    value: TripsStatuses.OnWay,
    color: '#C69A00'
  },
  [TripsStatuses.Arrived]: {
    label: i18n.t('tripStatuses.arrived'),
    value: TripsStatuses.Arrived,
    color: '#008C20'
  },
  [TripsStatuses.Completed]: {
    label: i18n.t('tripStatuses.completed'),
    value: TripsStatuses.Completed
  },
  [TripsStatuses.Cancelled]: {
    label: i18n.t('tripStatuses.cancelled'),
    value: TripsStatuses.Cancelled
  }
}
