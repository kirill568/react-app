import { Box, Container } from '@mui/system';

const LocalContainer = ({children}) => {
    return (
            <Container maxWidth="lg" sx={{height: '100%'}}>
                {children}
            </Container>
        )
}

export default LocalContainer