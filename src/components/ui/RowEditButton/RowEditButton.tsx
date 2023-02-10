import { CheckOutlined, CloseOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'

type RowEditButtonProps = {
  formId?: string
  isLoading?: boolean
  onEditChange: (updatedEditingRowIds: string[]) => void
  onReset?: (updatedEditingRowIds: string[]) => void
  handleSubmit: () => void
}

export const RowEditButton: React.FC<RowEditButtonProps> = ({
  formId,
  isLoading,
  onEditChange,
  onReset,
  handleSubmit
}) => {
  const handleEditDisable = () => {
    // TODO: Enable multiple rows in editing state
    // const updatedItems = [...editingRowIds]
    // const toRemoveIndex = updatedItems.findIndex((id) => id === recordId)
    // updatedItems.splice(toRemoveIndex, 1)
    // onEditChange(updatedItems)
    onEditChange([])
  }

  const handleReset = () => {
    // TODO: Enable multiple rows in editing state
    // const updatedItems = [...editingRowIds]
    // const toRemoveIndex = updatedItems.findIndex((id) => id === recordId)
    // updatedItems.splice(toRemoveIndex, 1)
    // onEditChange(updatedItems)
    if (onReset) {
      onReset([])
    }
  }

  return (
    <div className='mt-6'>
      <Button
        form={formId}
        onClick={handleSubmit}
        loading={isLoading}
        icon={<CheckOutlined />}
        className='ant-btn-approve'
      />
      <Button loading={isLoading} onClick={handleEditDisable} icon={<CloseOutlined />} className='ant-btn-cancel' />
      {onReset && <Button onClick={handleReset} icon={<ReloadOutlined />} />}
    </div>
  )
}
