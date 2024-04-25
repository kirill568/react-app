import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  flexRender,
} from '@tanstack/react-table'
import TableCell from '@mui/material/TableCell'
import PropTypes from 'prop-types'

const CTableCell = ({ cell }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  })

  const { column } = cell

  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right')

  let opacity = 1
  if (isDragging) {
    opacity = 0.8
  } else if (isPinned) {
    opacity = 0.95
  }

  const style = {
    opacity: opacity,
    position: isPinned ? 'sticky' : 'relative',
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: 'width transform 0.2s ease-in-out',
    width: column.getSize(),
    zIndex: isDragging || isPinned ? 1 : 0,
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    backgroundColor: 'white',
    boxSizing: 'border-box'
  }

  return (
    <TableCell sx={style} ref={setNodeRef}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  )
}

CTableCell.propTypes = {
  cell: PropTypes.object,
}

export default CTableCell