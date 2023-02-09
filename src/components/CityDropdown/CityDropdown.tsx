// import styles from './CityDropdown.module.scss'

import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SelectProps } from 'antd'
import { Dropdown } from 'components/ui/Dropdown'
import { getCityList } from 'services'
import { CityType } from 'types/city'
import { DistrictDropdown } from 'components/DistrictDropdown'

type CityDropdownProps = {
  cityDropdownProps?: SelectProps
  districtDropdownProps?: SelectProps
}
export const CityDropdown: React.FC<CityDropdownProps> = ({ cityDropdownProps, districtDropdownProps }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [cities, setCities] = useState<CityType[]>()
  const [selectedCityId, setSelectedCityId] = useState<string>()

  useEffect(() => {
    getCityList()
      .then(setCities)
      .finally(() => setIsLoading(false))
  }, [])

  const cityOptions = useMemo(() => cities?.map((city) => ({ label: city.name, value: city._id })), [cities])

  return (
    <>
      <Dropdown
        showSearch
        options={cityOptions}
        allowClear
        placeholder={t('selectCity')}
        loading={isLoading}
        onChange={setSelectedCityId}
        {...cityDropdownProps}
      />
      <DistrictDropdown cityId={selectedCityId} disabled={!selectedCityId || isLoading} {...districtDropdownProps} />
    </>
  )
}
