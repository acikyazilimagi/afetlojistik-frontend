import React from 'react'
import { IResourceComponentsProps } from '@pankod/refine-core'
import {
  useTable,
  List,
  Table,
  Space,
  EditButton,
  ShowButton,
  DeleteButton,
  DateField,
  TagField,
  Tag
} from '@pankod/refine-antd'
import { useTranslation } from 'react-i18next'
import { ArrowRightOutlined } from '@ant-design/icons'
import { FaTruck, FaIdCard, FaPhone } from 'react-icons/fa'
import { TripType } from 'types/trip'
import { ProductType } from 'types/product'
import { VehicleType } from 'types/vehicle'
import { LocationType } from 'types/location'

export const TripList: React.FC<IResourceComponentsProps<TripType>> = () => {
  const { t } = useTranslation()
  const { tableProps } = useTable({
    syncWithLocation: true
  })

  return (
    <List>
      <Table {...tableProps} rowKey='tripNumber'>
        <Table.Column dataIndex='tripNumber' title='Trip Number' />
        <Table.Column dataIndex='createdBy' title='Created By' />
        <Table.Column
          dataIndex={['estimatedDepartTime']}
          title='Estimated Depart Time'
          render={(value: string) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={['fromLocation']}
          title={t('locationInfo') as string}
          render={(fromLocation: LocationType, record: TripType) => (
            <Space direction='horizontal' size={4}>
              <Tag>{fromLocation.cityName}</Tag>
              <ArrowRightOutlined />
              <Tag>{record.toLocation.cityName}</Tag>
            </Space>
          )}
        />
        <Table.Column
          dataIndex={['vehicle']}
          title={t('vehicleInfo') as string}
          render={(vehicle: VehicleType) => (
            <Space direction='vertical'>
              <Tag icon={<FaTruck />}>{vehicle.plateNumber}</Tag>
              <Tag icon={<FaIdCard />}>{vehicle.name}</Tag>
              <a href={`tel:${vehicle.phone}`}>
                <Tag icon={<FaPhone />}>{vehicle.phone}</Tag>
              </a>
            </Space>
          )}
        />
        <Table.Column
          dataIndex='products'
          title='Products'
          render={(value: ProductType[]) => (
            <>
              {value?.map((item) => (
                <TagField value={item?.count} key={item?.count} />
              ))}
            </>
          )}
        />
        <Table.Column
          dataIndex={['createdAt']}
          title='Created At'
          render={(value: string) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={['updatedAt']}
          title='Updated At'
          render={(value: string) => <DateField value={value} />}
        />
        <Table.Column
          title='Actions'
          dataIndex='actions'
          render={(_, record: TripType) => (
            <Space>
              <EditButton hideText size='small' recordItemId={record.tripNumber} />
              <ShowButton hideText size='small' recordItemId={record.tripNumber} />
              <DeleteButton hideText size='small' recordItemId={record.tripNumber} />
            </Space>
          )}
        />
      </Table>
    </List>
  )
}
