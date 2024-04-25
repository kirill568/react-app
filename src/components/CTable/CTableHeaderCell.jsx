import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  flexRender,
} from '@tanstack/react-table'
import TableCell from '@mui/material/TableCell'
import { ArrowDownward, ArrowUpward, DragHandle } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'

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
    backgroundColor: 'white',
    height: '62px',
    boxSizing: 'border-box'
  }

  return (
    <TableCell colSpan={header.colSpan} sx={style} ref={setNodeRef}>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-start">
        <Typography onClick={header.column.getToggleSortingHandler()}>
          {flexRender(header.column.columnDef.header, header.getContext())}
        </Typography>

        <button {...attributes} {...listeners}><DragHandle fontSize="small"/></button>

        <Box onClick={header.column.getToggleSortingHandler()}>
          {
            {
              asc: <ArrowUpward fontSize="small" />,
              desc: <ArrowDownward fontSize="small" />,
            }[header.column.getIsSorted()] ?? null
          }
        </Box>
      </Stack>
    </TableCell >
  )
}

CTableHeaderCell.propTypes = {
  header: PropTypes.object,
}

export default CTableHeaderCell