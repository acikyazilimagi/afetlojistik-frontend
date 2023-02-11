import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Form, Modal } from 'antd'
import { FileExcelOutlined, FileOutlined } from '@ant-design/icons'
import { useFormik } from 'formik'
import moment from 'moment'
import { useModal } from '@pankod/refine-core'
import { ExcelExportFormType } from 'types/fileExport'
import { FormInput } from 'components/Form'
import { validationSchema } from './formHelper'

type CrudCreateModalProps = {
  onExport: (values: ExcelExportFormType) => void
}

const { useForm } = Form

export const ExcelExportOptionsModal: React.FC<CrudCreateModalProps> = ({ onExport }) => {
  const { t } = useTranslation()

  const { visible, show, close } = useModal({})
  const [form] = useForm()

  const defaultFileName = useMemo(() => {
    if (visible) {
      const now = moment().format('YYYY-MM-DD_HH-mm')
      return `${now}_excel`
    }
  }, [visible])

  const { handleSubmit, resetForm, errors, touched, values, handleChange } = useFormik({
    initialValues: { fileName: defaultFileName },
    validationSchema,
    onSubmit: (values) => onExport({ ...values }),
    enableReinitialize: true,
    validateOnChange: true
  })

  const resetModal = () => {
    resetForm({ values: { fileName: defaultFileName } })
    close()
  }

  useEffect(() => {
    form.setFieldsValue(values)
  }, [form, values])

  return (
    <>
      <Button icon={<FileExcelOutlined />} block onClick={show}>
        {t('crud.exportExcel')}
      </Button>
      <Modal
        open={visible}
        onCancel={resetModal}
        destroyOnClose
        title={t('crud.exportExcelModalTitle')}
        footer={
          <Button form='exportExcelForm' htmlType='submit' disabled={!!errors.fileName}>
            {t('crud.exportButton')}
          </Button>
        }
      >
        <Form id='exportExcelForm' form={form} layout='vertical' onFinish={handleSubmit}>
          <FormInput
            name={'fileName'}
            label={t('crud.exportExcelNameInput')}
            errorMessage={errors.fileName}
            isTouched={touched.fileName}
            value={values.fileName}
            handleChange={handleChange}
            additionalProps={{
              placeholder: t('crud.exportExcelFilePlaceholder'),
              prefix: <FileOutlined className='site-form-item-icon' />,
              size: 'large'
            }}
          />
        </Form>
      </Modal>
    </>
  )
}
