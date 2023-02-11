import i18n from 'i18n'

export enum UserStatuses {
  Pending = 100,
  Active = 200,
  Disabled = 300
}

export const userStatusOptions: Record<UserStatuses, { label: string; value: UserStatuses; color?: string }> = {
  [UserStatuses.Pending]: {
    label: i18n.t('userStatuses.pending'),
    value: UserStatuses.Pending,
    color: '#007787'
  },
  [UserStatuses.Active]: {
    label: i18n.t('userStatuses.active'),
    value: UserStatuses.Active,
    color: '#C69A00'
  },
  [UserStatuses.Disabled]: {
    label: i18n.t('userStatuses.disabled'),
    value: UserStatuses.Disabled,
    color: '#008C20'
  }
}
