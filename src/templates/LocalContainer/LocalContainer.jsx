import { Box, Container } from '@mui/system';
import { useContext } from "react";
import ThemeContext from '../../contexts/ThemeContext';
import { THEME_LIGHT, THEME_DARK } from "../../contexts/ThemeContext"

const LocalContainer = ({children}) => {
    const { theme, setTheme } = useContext(ThemeContext)

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

export default LocalContainer