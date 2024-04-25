import {
  createColumnHelper
} from "@tanstack/react-table"

import exemplar from '../../../api/api'
import CTable from '../../../components/CTable/CTable'

const fetchSize = 15

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor("id", {
    accessorKey: 'id',
    id: 'id',
    header: () => "Id",
    cell: info => info.renderValue(),
    size: 150
  }),
  columnHelper.accessor("title", {
    accessorKey: 'title',
    id: 'title',
    header: () => "Title",
    cell: info => info.renderValue(),
    size: 350
  }),
  columnHelper.accessor("body", {
    accessorKey: 'body',
    id: 'body',
    header: () => "Body",
    cell: info => info.renderValue(),
    size: 500
  }),
  columnHelper.accessor("userId", {
    accessorKey: 'userId',
    id: 'userId',
    header: () => "UserId",
    cell: info => info.renderValue(),
    size: 150
  })
]

const columnPinning = {
  left: ['id']
}

const queryFn = async (sorting, pageParam) => {
  const start = pageParam * fetchSize
  const sort = sorting[0]
  const response = await exemplar.get("/posts", {
    params: {
      _start: start,
      _limit: fetchSize,
      _sort: sort ? sort.id : null,
      _order: sort ? (sort.desc ? "desc" : "asc") : null
    }
  })
  return response.data
}

const Lab8 = () => {
  return (
    <CTable
      columns={columns}
      columnPinning={columnPinning}
      queryFn={queryFn}
      queryKey={"posts"}
      totalDBRowCount={100}
      estimateRowHeight={166}
    ></CTable>
  )
}

export default Lab8