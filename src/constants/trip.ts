import i18n from 'i18n'

export enum TripStatuses {
  Created = 100,
  OnWay = 200,
  Arrived = 300,
  Cancelled = 500
}

export const tripStatusOptions: Record<TripStatuses, { label: string; value: TripStatuses; color?: string }> = {
  [TripStatuses.Created]: {
    label: i18n.t('tripStatuses.created'),
    value: TripStatuses.Created,
    color: '#007787'
  },
  [TripStatuses.OnWay]: {
    label: i18n.t('tripStatuses.onWay'),
    value: TripStatuses.OnWay,
    color: '#C69A00'
  },
  [TripStatuses.Arrived]: {
    label: i18n.t('tripStatuses.arrived'),
    value: TripStatuses.Arrived,
    color: '#008C20'
  },
  [TripStatuses.Cancelled]: {
    label: i18n.t('tripStatuses.cancelled'),
    value: TripStatuses.Cancelled
  }
}
