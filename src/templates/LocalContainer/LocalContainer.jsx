import { Box, Container } from '@mui/system';
import { useContext } from "react";
import ThemeContext from '../../contexts/ThemeContext';
import PropTypes from 'prop-types';

const LocalContainer = ({children}) => {
  const { theme} = useContext(ThemeContext)

  return (
    <Box 
      width={"100%"} 
      height={"100%"}
      className={`local-container-theme-${theme}`}
    >
      <Container 
        maxWidth="lg" 
        sx={{height: "100%", display: "flex", flexDirection: "column"}}
      >
        {children}
      </Container>
    </Box>
  )
}

LocalContainer.propTypes = {
  children: PropTypes.node
}

export default LocalContainer