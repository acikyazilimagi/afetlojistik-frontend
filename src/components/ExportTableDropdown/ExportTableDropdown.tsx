import React from 'react'
import { Button, Dropdown, Menu } from 'antd'
import { useTranslation } from 'react-i18next'
import { useReactToPrint } from 'react-to-print'
import * as XLSX from 'xlsx'
import * as xlsxStyle from 'xlsx-js-style'
import { DEFAULT_PRINT_STYLE, TABLE_EXPORT_SELECT_OPTIONS } from 'constants/fileExport'
import { ExcelExportFormType, TableExportType } from 'types/fileExport'
import { applyStyle, deleteColumns } from 'utils/fileExport'
import { ExcelExportOptionsModal } from 'components/ExcelExportOptionsModal'

type ExportTableDropdownProps = {
  enabledExports: TableExportType[]
  tableId: string
  hiddenColumnIndices?: number[]
}

export const ExportTableDropdown: React.FC<ExportTableDropdownProps> = ({
  enabledExports,
  tableId,
  hiddenColumnIndices
}) => {
  const { t } = useTranslation()
  const enabledOptions = TABLE_EXPORT_SELECT_OPTIONS.filter((opt) => enabledExports?.includes(opt.value))
  const domElement = document.getElementById(tableId)

  const handlePrint = useReactToPrint({
    content: () => domElement ?? null,
    pageStyle: DEFAULT_PRINT_STYLE,
    removeAfterPrint: true
  })

  const handleExcelExport = (values: ExcelExportFormType) => {
    const wb = XLSX.utils.table_to_book(domElement, { cellDates: true })
    const ws = wb.Sheets[wb.SheetNames[0]]

    hiddenColumnIndices?.forEach((col) => {
      deleteColumns(ws, col, 1)
    })

    applyStyle(ws)

    XLSX.utils.sheet_add_aoa(ws, [[`${t('crud.exportCreatedAt')}: ${new Date().toISOString()}`]], {
      origin: -1,
      cellDates: true
    })

    xlsxStyle.writeFile(wb, `${values.fileName || 'export'}.xlsx`, { cellDates: true })
  }

  return (
    <Dropdown
      overlay={
        <Menu>
          {enabledOptions.map((option, index) => (
            <Menu.Item key={index}>
              <Button icon={option.icon} block onClick={handlePrint}>
                {t(option.label)}
              </Button>
            </Menu.Item>
          ))}
          {enabledExports.includes('excel') && (
            <Menu.Item key='exportExcel'>
              <ExcelExportOptionsModal onExport={handleExcelExport} />
            </Menu.Item>
          )}
        </Menu>
      }
    >
      <Button type='primary'>{t('crud.exportMenu')}</Button>
    </Dropdown>
  )
}
