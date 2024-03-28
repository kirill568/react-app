import TableRow from '@mui/material/TableRow'
import PropTypes from 'prop-types'

const BTableRow = ( {children}) => {
  return (
    <TableRow>
      {children}
    </TableRow>
  )
}

BTableRow.propTypes = {
  children: PropTypes.node
}

export default BTableRow