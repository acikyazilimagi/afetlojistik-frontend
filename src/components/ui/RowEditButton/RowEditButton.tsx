import { CheckOutlined, CloseOutlined, EditOutlined, ReloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useMemo } from 'react'

type RowEditButtonProps = {
  formId?: string
  recordId: string
  editingRowIds: string[]
  isLoading?: boolean
  onEditChange: (updatedEditingRowIds: string[]) => void
  onSave: () => void
  onReset?: (updatedEditingRowIds: string[]) => void
}

export const RowEditButton: React.FC<RowEditButtonProps> = ({
  formId,
  recordId,
  editingRowIds,
  isLoading,
  onEditChange,
  onSave,
  onReset
}) => {
  const isEditing = useMemo(() => editingRowIds.includes(recordId), [editingRowIds, recordId])

  const handleEditEnable = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.blur()
    // TODO: Enable multiple rows in editing state
    // const updatedItems = [...editingRowIds]
    // updatedItems.push(recordId)
    // onEditChange(updatedItems)
    onEditChange([recordId])
  }

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

  if (isEditing) {
    return (
      <div className='mt-6'>
        <Button
          form={formId}
          htmlType='submit'
          loading={isLoading}
          onClick={onSave}
          icon={<CheckOutlined />}
          className='ant-btn-approve'
        />
        <Button loading={isLoading} onClick={handleEditDisable} icon={<CloseOutlined />} className='ant-btn-cancel' />
        {onReset && <Button onClick={handleReset} icon={<ReloadOutlined />} />}
      </div>
    )
  }

  return <Button loading={isLoading} onClick={handleEditEnable} icon={<EditOutlined />} className='ant-btn-secondary' />
}
