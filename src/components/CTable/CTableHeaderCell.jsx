import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  flexRender,
} from '@tanstack/react-table'
import TableCell from '@mui/material/TableCell';

const CTableHeaderCell = ({ header }) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    })

  const { column } = header

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
    opacity,
    position: isPinned ? 'sticky' : 'relative',
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: 'width transform 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    width: column.getSize(),
    zIndex: isDragging || isPinned ? 1 : 0,
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    backgroundColor: 'white'
  }

  return (
    <TableCell colSpan={header.colSpan} sx={style} ref={setNodeRef}>
      <div
        onClick={header.column.getToggleSortingHandler()}
      >
        {
          {
            asc: ' 🔼',
            desc: ' 🔽',
          }[header.column.getIsSorted()] ?? null
        }
        {flexRender(header.column.columnDef.header, header.getContext())}

      </div>
      <button {...attributes} {...listeners}>
        🟰
      </button>
    </TableCell>
  )
}

export default CTableHeaderCell