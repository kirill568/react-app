import ReactDOM from 'react-dom/client'
import { useState, useEffect, useCallback } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper
} from "@tanstack/react-table"
import exemplar from '../../../api/api'

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor("id", {
    header: () => "Id",
    cell: info => info.getValue()
  }),
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: info => { info.getValue() }
  }),
  columnHelper.accessor("username", {
    header: () => "Username",
    cell: info => info.renderValue()
  }),
  columnHelper.accessor("email", {
    header: () => "Email",
    cell: info => info.renderValue()
  })
]

const Lab8 = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    exemplar.get("/users")
      .then((response) => {
        setUsers(response.data)
      })
  }, [])

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => {
                return (
                  <td key={cell.id}>
                    {cell.getValue()}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Lab8