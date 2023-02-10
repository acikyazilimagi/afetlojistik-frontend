import { Button, Collapse, DatePicker, Form, FormProps, Select } from '@pankod/refine-antd'
import { useTranslation } from 'react-i18next'
import { tripStatusOptions } from 'constants/trip'

const { RangePicker } = DatePicker
const { Panel } = Collapse

export interface ICategory {
  id: number
  title: string
}

export const TripListFilter: React.FC<{ formProps: FormProps }> = ({ formProps }) => {
  const { t } = useTranslation()

  return (
    <Collapse defaultActiveKey={['filters']}>
      <Panel header={t('filters')} key='filters'>
        <Form layout='vertical' {...formProps}>
          <Form.Item label='Status' name='statuses'>
            <Select
              allowClear
              mode='multiple'
              options={Object.values(tripStatusOptions).map((option) => ({ ...option, label: t(option.label) }))}
              placeholder='Post Status'
            />
          </Form.Item>
          <Form.Item label='Created At' name='createdAt'>
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary'>
              {t('filter')}
            </Button>
          </Form.Item>
        </Form>
      </Panel>
    </Collapse>
  )
}
