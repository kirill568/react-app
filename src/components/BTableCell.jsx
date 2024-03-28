import TableCell from '@mui/material/TableCell'
import PropTypes from 'prop-types'

const BTableCell = ({children}) => {
  return (
    <TableCell>
      {children}
    </TableCell>
  )
}

BTableCell.propTypes = {
  children: PropTypes.node
}

export default BTableCell