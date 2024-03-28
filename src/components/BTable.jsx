import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import Paper from '@mui/material/Paper'
import BTableRow from './BTableRow'
import BTableCell from './BTableCell'
import PropTypes from 'prop-types'

const BTable = ({ headers = [], children }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <BTableRow>
            {
              headers.map((header) => {
                return (<BTableCell key={header.key}>{header.title}</BTableCell>)
              })
            }
          </BTableRow>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

BTable.propTypes = {
  headers: PropTypes.array,
  children: PropTypes.node
}

export default BTable