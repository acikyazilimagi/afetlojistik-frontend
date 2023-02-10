// import styles from './CityDropdown.module.scss'

import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SelectProps } from 'antd'
import { Dropdown } from 'components/ui/Dropdown'
import { getDistrictList } from 'services'
import { CityType } from 'types/city'

type DistrictDropdownProps = {
  cityId?: string
} & SelectProps

export const DistrictDropdown: React.FC<DistrictDropdownProps> = ({ cityId, disabled, ...dropdownProps }) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [districts, setDistricts] = useState<CityType[]>()

  useEffect(() => {
    if (cityId) {
      setIsLoading(true)
      getDistrictList(cityId)
        .then(setDistricts)
        .finally(() => setIsLoading(false))
    }
  }, [cityId])

  const districtOptions = useMemo(
    () => districts?.map((district) => ({ label: district.name, value: district._id })),
    [districts]
  )

  return (
    <Dropdown
      title={t('originDistrict')}
      disabled={disabled}
      showSearch
      options={districtOptions}
      allowClear
      placeholder={t('selectDistrict')}
      loading={isLoading}
      {...dropdownProps}
    />
  )
}
