// import styles from './CityDropdown.module.scss'

import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SelectProps } from 'antd'
import { Dropdown } from 'components/ui/Dropdown'
import { getCityList } from 'services'
import { CityType } from 'types/city'

type CityDropdownProps = SelectProps & { title?: string }
export const CityDropdown: React.FC<CityDropdownProps> = ({ ...props }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [cities, setCities] = useState<CityType[]>()

  useEffect(() => {
    getCityList()
      .then(setCities)
      .finally(() => setIsLoading(false))
  }, [])

  const cityOptions = useMemo(() => cities?.map((city) => ({ label: city.name, value: city._id })), [cities])

  return (
    <Dropdown
      title={t('originCity')}
      showSearch
      options={cityOptions}
      allowClear
      placeholder={t('selectCity')}
      loading={isLoading}
      {...props}
    />
  )
}
