// import styles from './ProductCategoryDropdown.module.scss'

import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { SelectProps } from 'antd'
import { Dropdown } from 'components/ui/Dropdown'
import { ProductCategoryType } from 'types/productCategoryType'

type ProductCategoryDropdownProps = SelectProps & { categoryList?: ProductCategoryType[] }
export const ProductCategoryDropdown: React.FC<ProductCategoryDropdownProps> = ({ categoryList, ...props }) => {
  const { t } = useTranslation()

  const categoryOptions = useMemo(
    () => categoryList?.map((category) => ({ label: category.name, value: category._id })),
    [categoryList]
  )

  return (
    <Dropdown
      title={t('category')}
      showSearch
      options={categoryOptions}
      allowClear
      placeholder={t('selectCategory')}
      {...props}
    />
  )
}
