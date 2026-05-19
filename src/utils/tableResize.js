const MIN_COLUMN_WIDTH = 56
const RESIZE_HOT_ZONE = 8

const getColumnName = (cell) => {
  return [...cell.classList].find(name => /^el-table_\d+_column_\d+$/.test(name))
}

const setColumnWidth = (table, cell, width) => {
  const nextWidth = `${Math.max(MIN_COLUMN_WIDTH, Math.round(width))}px`
  const columnName = getColumnName(cell)
  const columns = columnName
    ? table.querySelectorAll(`col[name="${columnName}"]`)
    : table.querySelectorAll(`colgroup col:nth-child(${cell.cellIndex + 1})`)

  columns.forEach(column => {
    column.style.width = nextWidth
    column.setAttribute('width', `${Math.max(MIN_COLUMN_WIDTH, Math.round(width))}`)
  })
  cell.style.width = nextWidth
  cell.style.minWidth = nextWidth
}

export function installLiveTableResize () {
  document.addEventListener('mousedown', (event) => {
    const cell = event.target.closest?.('.el-table__header-wrapper th.el-table__cell')
    if (!cell) {
      return
    }
    const rect = cell.getBoundingClientRect()
    const isResizeArea = rect.right - event.clientX <= RESIZE_HOT_ZONE
    if (!isResizeArea) {
      return
    }
    const table = cell.closest('.el-table')
    if (!table) {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    event.stopImmediatePropagation()

    const startX = event.clientX
    const startWidth = rect.width
    table.classList.add('is-live-resizing')

    const onMouseMove = (moveEvent) => {
      const nextWidth = startWidth + moveEvent.clientX - startX
      setColumnWidth(table, cell, nextWidth)
    }
    const onMouseUp = () => {
      table.classList.remove('is-live-resizing')
      document.removeEventListener('mousemove', onMouseMove, true)
      document.removeEventListener('mouseup', onMouseUp, true)
    }

    document.addEventListener('mousemove', onMouseMove, true)
    document.addEventListener('mouseup', onMouseUp, true)
  }, true)
}
