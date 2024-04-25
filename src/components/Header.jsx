import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import BIconButton from './BIconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom"
import ThemeContext from '../contexts/ThemeContext'
import { THEME_LIGHT, THEME_DARK } from "../contexts/ThemeContext"
import { useContext } from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import IconButton from '@mui/material/IconButton'
import PropTypes from 'prop-types'

const Header = ({ pages, onClickMenu }) => {
  const { theme, setTheme } = useContext(ThemeContext)
  const navigate = useNavigate()

  const onThemeChange = () => {
    if (theme=== THEME_DARK) {
      setTheme(THEME_LIGHT)
    } else {
      setTheme(THEME_DARK)
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <BIconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onClickMenu}
        >
          <MenuIcon />
        </BIconButton>

        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          {pages.map((page) => (
            <Button
              key={page.id}
              onClick={() => navigate(page.path)}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page.title}
            </Button>
          ))}
        </Box>

        <IconButton sx={{ ml: 1 }} onClick={onThemeChange} color="inherit">
          {theme=== THEME_DARK ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  pages: PropTypes.array,
  onClickMenu: PropTypes.func
}

export default Header