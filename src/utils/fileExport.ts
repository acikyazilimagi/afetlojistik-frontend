/* eslint-disable no-param-reassign */
import * as XLSX from 'xlsx'

const clampRange = (range: XLSX.Range) => {
  if (range.e.r >= 1 << 20) range.e.r = (1 << 20) - 1
  if (range.e.c >= 1 << 14) range.e.c = (1 << 14) - 1
  return range
}

let crefregex =
  /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)([1-9]\d{0,5}|10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6])(?![_.\\(A-Za-z0-9])/g

/*
deletes `ncolsToDelete` cols STARTING WITH `startColumn`
usage: delete_cols(ws, 4, 3); // deletes columns E-G and shifts everything after G to the left by 3 columns
*/
export const deleteColumns = (ws: XLSX.WorkSheet, startColumn: number, ncolsToDelete: number) => {
  if (!ws) {
    throw new Error('Operation expects a worksheet')
  }
  if (!ncolsToDelete) {
    ncolsToDelete = 1
  }
  if (!startColumn) {
    startColumn = 0
  }

  /* extract original range */
  let range = XLSX.utils.decode_range(ws['!ref']!)
  let R = 0,
    C = 0

  let decodeCallback = function ($0: string, $1: string, $2: string, $3: string, $4: string, $5: string) {
    let _R = XLSX.utils.decode_row($5),
      _C = XLSX.utils.decode_col($3)
    if (_C >= startColumn) {
      _C -= ncolsToDelete
      if (_C < startColumn) {
        return '#REF!'
      }
    }
    return $1 + ($2 === '$' ? $2 + $3 : XLSX.utils.encode_col(_C)) + ($4 === '$' ? $4 + $5 : XLSX.utils.encode_row(_R))
  }

  let addr, naddr
  for (C = startColumn + ncolsToDelete; C <= range.e.c; ++C) {
    for (R = range.s.r; R <= range.e.r; ++R) {
      addr = XLSX.utils.encode_cell({ r: R, c: C })
      naddr = XLSX.utils.encode_cell({ r: R, c: C - ncolsToDelete })
      if (!ws[addr]) {
        delete ws[naddr]
        continue
      }
      if (ws[addr].f) {
        ws[addr].f = ws[addr].f.replace(crefregex, decodeCallback)
      }
      ws[naddr] = ws[addr]
    }
  }
  for (C = range.e.c; C > range.e.c - ncolsToDelete; --C) {
    for (R = range.s.r; R <= range.e.r; ++R) {
      addr = XLSX.utils.encode_cell({ r: R, c: C })
      delete ws[addr]
    }
  }
  for (C = 0; C < startColumn; ++C) {
    for (R = range.s.r; R <= range.e.r; ++R) {
      addr = XLSX.utils.encode_cell({ r: R, c: C })
      if (ws[addr] && ws[addr].f) {
        ws[addr].f = ws[addr].f.replace(crefregex, decodeCallback)
      }
    }
  }

  /* write new range */
  range.e.c -= ncolsToDelete
  if (range.e.c < range.s.c) {
    range.e.c = range.s.c
  }
  ws['!ref'] = XLSX.utils.encode_range(clampRange(range))

  /* merge cells */
  if (ws['!merges'])
    ws['!merges'].forEach(function (merge, idx) {
      let mergerange
      switch (typeof merge) {
        case 'string':
          mergerange = XLSX.utils.decode_range(merge)
          break
        case 'object':
          mergerange = merge
          break
        default:
          throw new Error('Unexpected merge ref ' + merge)
      }
      if (mergerange.s.c >= startColumn) {
        mergerange.s.c = Math.max(mergerange.s.c - ncolsToDelete, startColumn)
        if (mergerange.e.c < startColumn + ncolsToDelete) {
          delete ws['!merges']![idx]
          return
        }
        mergerange.e.c -= ncolsToDelete
        if (mergerange.e.c < mergerange.s.c) {
          delete ws['!merges']![idx]
          return
        }
      } else if (mergerange.e.c >= startColumn) {
        mergerange.e.c = Math.max(mergerange.e.c - ncolsToDelete, startColumn)
      }
      clampRange(mergerange)
      ws['!merges']![idx] = mergerange
    })
  if (ws['!merges']) {
    ws['!merges'] = ws['!merges'].filter(function (x) {
      return !!x
    })
  }

  /* cols */
  if (ws['!cols']) {
    ws['!cols'].splice(startColumn, ncolsToDelete)
  }
}

export const applyStyle = (ws: XLSX.WorkSheet) => {
  for (let i in ws) {
    if (typeof ws[i] != 'object') {
      continue
    }
    let cell = XLSX.utils.decode_cell(i)

    ws[i].s = {
      // styling for all cells
      font: {
        name: 'arial'
      },
      alignment: {
        vertical: 'center',
        horizontal: 'center',
        wrapText: '1' // any truthy value here
      }
    }

    if (cell.r === 0) {
      // first row
      ws[i].s.font = {
        bold: true,
        color: { rgb: 'fbfaff' }
      }
      ws[i].s.border = {
        bottom: {
          // bottom border
          style: 'thin',
          color: 'f3f0fe'
        }
      }
      ws[i].s.fill = {
        // background color
        patternType: 'solid',
        fgColor: { rgb: '007787' },
        bgColor: { rgb: '007787' }
      }
    }

    if (cell.r % 2) {
      // every other row
      ws[i].s.fill = {
        // background color
        patternType: 'solid',
        fgColor: { rgb: 'e8ebef' },
        bgColor: { rgb: 'e8ebef' }
      }
    }
  }
}
