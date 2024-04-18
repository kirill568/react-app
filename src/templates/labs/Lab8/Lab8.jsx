import ReactDOM from 'react-dom/client'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper
} from "@tanstack/react-table"
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'

// needed for table body level scope DnD setup
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'

// needed for row & cell level scope DnD setup
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import exemplar from '../../../api/api'

const fetchSize = 15

const DraggableTableHeader = ({
  header,
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    })

  const style = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: 'width transform 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  }

  return (
    <th colSpan={header.colSpan} ref={setNodeRef} style={style}>
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
    </th>
  )
}

const DragAlongCell = ({ cell }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  })

  const style = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: 'width transform 0.2s ease-in-out',
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  }

  return (
    <td style={style} ref={setNodeRef}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  )
}


const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor("id", {
    accessorKey: 'id',
    id: 'id',
    header: () => "Id",
    cell: info => info.renderValue()
  }),
  columnHelper.accessor("title", {
    accessorKey: 'title',
    id: 'title',
    header: () => "Title",
    cell: info => info.renderValue()
  }),
  columnHelper.accessor("body", {
    accessorKey: 'body',
    id: 'body',
    header: () => "Body",
    cell: info => info.renderValue()
  }),
  columnHelper.accessor("userId", {
    accessorKey: 'userId',
    id: 'userId',
    header: () => "UserId",
    cell: info => info.renderValue()
  })
]

const queryClient = new QueryClient()

const Lab8 = () => {
  // const [posts, setPosts] = useState([])
  const [sorting, setSorting] = useState([])
  const [columnOrder, setColumnOrder] = useState(() =>
    columns.map(c => c.id)
  )
  const tableContainerRef = useRef(null)

  // useEffect(() => {
  //   exemplar.get("/posts")
  //     .then((response) => {
  //       setPosts(response.data)
  //     })
  // }, [])

  //react-query has a useInfiniteQuery hook that is perfect for this use case
  const { data, fetchNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: [
        "posts",
        sorting, //refetch when sorting changes
      ],
      queryFn: async ({ pageParam = 0 }) => {
        const start = pageParam * fetchSize
        const sort = sorting[0]
        console.log(sort)
        const response = await exemplar.get("/posts", { params: {
          _start: start, 
          _limit: fetchSize,
          _sort: sort ? sort.id : null,
          _order: sort ? (sort.desc ? "desc" : "asc") : null
        } }) //pretend api call
        console.log(response.data)
        return response.data
      },
      initialPageParam: 0,
      getNextPageParam: (_lastGroup, groups) => groups.length,
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
    })

  //flatten the array of arrays from the useInfiniteQuery hook
  const flatData = useMemo(
    () => data?.pages?.flatMap(page => page) ?? [],
    [data]
  )
  const totalFetched = flatData.length
  const totalDBRowCount = 100

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        //once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage()
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
  )

  //a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current)
  }, [fetchMoreOnBottomReached])
  
  const table = useReactTable({
    data: flatData,
    columns,
    state: {
      sorting,
      columnOrder
    },
    onColumnOrderChange: setColumnOrder,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  })

  //scroll to top of table when sorting changes
  const handleSortingChange = updater => {
    setSorting(updater)
    if (!!table.getRowModel().rows.length) {
      rowVirtualizer.scrollToIndex?.(0)
    }
  }

  const { rows } = table.getRowModel()

  //since this table option is derived from table row model state, we're using the table.setOptions utility
  table.setOptions(prev => ({
    ...prev,
    onSortingChange: handleSortingChange,
  }))

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 166, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
        navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  })

  function handleDragEnd(event) {
    const { active, over } = event
    console.log("handleDragEnd")
    if (active && over && active.id !== over.id) {
      console.log(JSON.stringify(columnOrder))
      setColumnOrder(columnOrder => {
        const oldIndex = columnOrder.indexOf(active.id)
        const newIndex = columnOrder.indexOf(over.id)
        return arrayMove(columnOrder, oldIndex, newIndex) //this is just a splice util
      })
      console.log(JSON.stringify(columnOrder))
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div
        className="container"
        onScroll={e => fetchMoreOnBottomReached(e.target)}
        ref={tableContainerRef}
        style={{
          overflow: 'auto', //our scrollable table container
          position: 'relative', //needed for sticky header
          height: '600px', //should be a fixed height
        }}
      >
        <table style={{ display: 'grid' }}>
          <thead
            style={{
              display: 'grid',
              position: 'sticky',
              top: 0,
              zIndex: 1,
            }}
          >
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                <SortableContext
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  {headerGroup.headers.map(header => (
                    <DraggableTableHeader key={header.id} header={header} />
                  ))}
                </SortableContext>
              </tr>
            ))}
          </thead>
          <tbody
            style={{
              display: 'grid',
              height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
              position: 'relative', //needed for absolute positioning of rows
            }}
          >
            {rowVirtualizer.getVirtualItems().map(virtualRow => {
              const row = rows[virtualRow.index]
              return (
                <tr
                  data-index={virtualRow.index} //needed for dynamic row height measurement
                  ref={node => rowVirtualizer.measureElement(node)} //measure dynamic row height
                  key={row.id}
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                    width: '100%',
                  }}
                >
                  {row.getVisibleCells().map(cell => {
                    return (
                      <SortableContext
                        key={cell.id}
                        items={columnOrder}
                        strategy={horizontalListSortingStrategy}
                      >
                        <DragAlongCell key={cell.id} cell={cell} />
                      </SortableContext>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </DndContext>
  )
}

export default Lab8

// {table.getRowModel().rows.map(row => (
//   <tr key={row.id}>
//     {row.getVisibleCells().map(cell => (
//       <SortableContext
//         key={cell.id}
//         items={columnOrder}
//         strategy={horizontalListSortingStrategy}
//       >
//         <DragAlongCell key={cell.id} cell={cell} />
//       </SortableContext>
//     ))}
//   </tr>
// ))}

// {headerGroup.headers.map(header => (
//   <th key={header.id}>
//     <div
//       onClick={header.column.getToggleSortingHandler()}
//     >
//       {flexRender(header.column.columnDef.header, header.getContext())}
//       {
//         {
//           asc: ' 🔼',
//           desc: ' 🔽',
//         }[header.column.getIsSorted()] ?? null
//       }
//     </div>
//   </th>
// ))}


// {table.getRowModel().rows.map(row => (
//   <tr key={row.id}>
//     {row.getVisibleCells().map(cell => {
//       return (
//         <td key={cell.id}>
//           {cell.getValue()}
//         </td>
//       )
//     })}
//   </tr>
// ))}