import React from 'react'
import { FilePdfOutlined, PrinterOutlined } from '@ant-design/icons'
import { TableExportType } from 'types/fileExport'
import { t } from '../utils/common'

export const TABLE_EXPORT_SELECT_OPTIONS: { label: string; value: TableExportType; icon: React.ReactNode }[] = [
  { label: t('crud.print'), value: 'print', icon: <PrinterOutlined /> },
  { label: t('crud.exportPdf'), value: 'print', icon: <FilePdfOutlined /> }
]

export const DEFAULT_PRINT_STYLE = `
  @page {
    size: A4 landscape;
  }

  `
