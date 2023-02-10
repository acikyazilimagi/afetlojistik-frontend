import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DefaultOptionType } from 'antd/lib/select'
import { Dropdown } from '@pankod/refine-antd'
import { OptionItemType, OptionsType } from 'types/option'
import { AntDesignSelectType } from 'types/dropdown'

type GenericDropdownProps<T extends PropertyKey> = {
  options?: OptionsType<T>
} & Omit<AntDesignSelectType, 'options'>

export const GenericDropdown = <T extends PropertyKey>({
  options,
  value,
  ...dropdownProps
}: GenericDropdownProps<T>) => {
  const { t } = useTranslation()

  const optionList = useMemo(() => {
    if (options) {
      return Object.values<OptionItemType<T>>(options).map((option) => ({
        ...option,
        value: option.value.toString(),
        label: t(option.label)
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  const formattedValue = useMemo(
    () => (value instanceof Array ? value.map((item) => item.toString()) : value?.toString()),
    [value]
  )

  return (
    <Dropdown
      showSearch
      placeholder={t('selectOption')}
      options={optionList as DefaultOptionType[]}
      {...dropdownProps}
      // @ts-ignore-next-line
      value={formattedValue}
    />
  )
}
