import React, { useState } from 'react'
import { CrudFilters, HttpError, IResourceComponentsProps } from '@pankod/refine-core'
import { useTable, List, Table, Space, EditButton, ShowButton, DeleteButton, DateField, Tag } from '@pankod/refine-antd'
import { useTranslation } from 'react-i18next'
import { ArrowRightOutlined } from '@ant-design/icons'
import { FaTruck, FaIdCard, FaPhone } from 'react-icons/fa'
import { TripListFilterPostType, TripListFilterTypes, TripType } from 'types/trip'
import { VehicleType } from 'types/vehicle'
import { LocationType } from 'types/location'
import { UserType } from 'types/user'
import { EditableTripStatusDropdown } from 'components/EditableTripStatusDropdown'
import { RowEditButton } from 'components/ui/RowEditButton'
import { TripListFilter } from './TripListFilter'

export const TripList: React.FC<IResourceComponentsProps<TripType>> = () => {
  const { t } = useTranslation()
  const [editingRows, setEditingRows] = useState<string[]>([])
  const { tableProps, searchFormProps } = useTable<TripListFilterPostType, HttpError, TripListFilterTypes>({
    syncWithLocation: true,
    onSearch: (params) => {
      const filters: CrudFilters = []
      const { statuses, createdAt } = params

      filters.push(
        {
          field: 'statuses',
          operator: 'eq',
          value: statuses
        },
        {
          field: 'startDate',
          operator: 'gte',
          value: createdAt ? createdAt[0].toISOString() : undefined
        },
        {
          field: 'endDate',
          operator: 'lte',
          value: createdAt ? createdAt[1].toISOString() : undefined
        }
      )

      return filters
    }
  })

  return (
    <List>
      <Space direction='vertical' size={20}>
        <TripListFilter formProps={searchFormProps} />
        <Table {...tableProps} rowKey='tripNumber'>
          <Table.Column dataIndex='tripNumber' title='Trip Number' />
          <Table.Column
            dataIndex='createdBy'
            title={t('createdBy') as string}
            render={(value: UserType) => `${value.name} ${value.surname}`}
          />
          <Table.Column
            dataIndex=''
            title={t('status') as string}
            render={(trip: TripType) => {
              const isEditing = editingRows.includes(trip._id)
              return (
                <>
                  <EditableTripStatusDropdown
                    formId='editTripStatusForm'
                    tripId={trip._id}
                    isEditing={isEditing}
                    currentStatus={trip.status}
                    // TODO: Update when endpoint is ready
                    onSubmit={() => {}}
                  />
                  <RowEditButton
                    formId='editTripStatusForm'
                    recordId={trip._id}
                    editingRowIds={editingRows}
                    onEditChange={setEditingRows}
                    onReset={setEditingRows}
                    // TODO: Update when endpoint is ready
                    onSave={() => {}}
                  />
                </>
              )
            }}
          />
          <Table.Column
            dataIndex={['estimatedDepartTime']}
            title={t('estimatedDepartTime') as string}
            render={(value: string) => <DateField value={value} />}
          />
          <Table.Column
            dataIndex={['fromLocation']}
            title={t('locationInfo') as string}
            render={(fromLocation: LocationType, record: TripType) => (
              <Space direction='horizontal' size={8} className='flex align-center'>
                <Tag className='mie-0'>{fromLocation.cityName}</Tag>
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
                <Tag className='flex gap-4 align-center' icon={<FaTruck />}>
                  {vehicle.plateNumber}
                </Tag>
                <Tag className='flex gap-4 align-center' icon={<FaIdCard />}>
                  {vehicle.name}
                </Tag>
                <a href={`tel:${vehicle.phone}`}>
                  <Tag className='flex gap-4 align-center' icon={<FaPhone />}>
                    {vehicle.phone}
                  </Tag>
                </a>
              </Space>
            )}
          />
          <Table.Column
            dataIndex={['createdAt']}
            title={t('createdAt') as string}
            render={(value: string) => <DateField value={value} />}
          />
          <Table.Column
            dataIndex={['updatedAt']}
            title={t('updatedAt') as string}
            render={(value: string) => <DateField value={value} />}
          />
          <Table.Column
            title={t('actions') as string}
            dataIndex='actions'
            render={(_, record: TripType) => (
              <Space>
                <EditButton hideText size='small' recordItemId={record._id} />
                <ShowButton hideText size='small' recordItemId={record._id} />
                <DeleteButton hideText size='small' recordItemId={record._id} />
              </Space>
            )}
          />
        </Table>
      </Space>
    </List>
  )
}
