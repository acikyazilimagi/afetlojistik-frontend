import React from 'react'
import { IResourceComponentsProps, BaseRecord } from '@pankod/refine-core'
import { useTable, List, Table, Space, EditButton, ShowButton, BooleanField } from '@pankod/refine-antd'
import { useTranslation } from 'react-i18next'

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { t } = useTranslation()

  const { tableProps } = useTable({
    syncWithLocation: true
  })

  return (
    <List title={t('pageTitles.users')}>
      <Table {...tableProps} rowKey='_id'>
        <Table.Column dataIndex='name' title={t<string>('name')} />
        <Table.Column dataIndex='surname' title={t<string>('surname')} />
        <Table.Column dataIndex='phone' title={t<string>('phoneNumber')} />{' '}
        <Table.Column dataIndex='email' title={t<string>('email')} />
        <Table.Column
          dataIndex={['active']}
          title={t<string>('active')}
          render={(value: boolean) => <BooleanField value={value} />}
        />
        <Table.Column
          title={t('actions') as string}
          dataIndex='actions'
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size='small' recordItemId={record._id} />
              <ShowButton hideText size='small' recordItemId={record._id} />
            </Space>
          )}
        />
      </Table>
    </List>
  )
}
