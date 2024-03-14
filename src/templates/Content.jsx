import { Box } from '@mui/system';
import PropTypes from 'prop-types';

const LocalContainer = ({children}) => {
  return (
    <Box>
      {children}
    </Box>
  )
}

LocalContainer.propTypes = {
  children: PropTypes.node
}
export default LocalContainer