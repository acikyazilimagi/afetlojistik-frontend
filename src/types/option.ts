export type OptionsType<T extends PropertyKey> = Record<T, OptionItemType<T>>

export type OptionItemType<T> = {
  label: string
  value: T
  icon?: React.ReactNode
  color?: string
}
