import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'
import Content from './templates/Content'
import LocalContainer from './templates/LocalContainer'
import Grid from '@mui/material/Grid';
import { Outlet } from "react-router-dom";
import { Box } from '@mui/material'
import ThemeContext from './contexts/ThemeContext'
import { THEME_LIGHT } from './contexts/ThemeContext'
import useVisibility from './hooks/useVisibility'

const menuItems = [
  { id: 1, text: "Lab1", path: "lab/1" },
  { id: 2, text: "Lab2", path: "lab/2" },
  { id: 4, text: "Lab4", path: "lab/4" },
  { id: 5, text: "Lab5", path: "lab/5" },
  { id: 6, text: "Lab6", path: "lab/6" },
  { id: 8, text: "Lab8", path: "lab/8" }
]

const pages = [
  { id: 1, title: 'Главная', path: "" },
  { id: 2, title: 'О себе', path: "about-me" }
]

function App() {
  const [theme, setTheme] = useState(THEME_LIGHT)
  const [isVisibleMenu, { show: menuOpen, hide: menuHide }] = useVisibility()

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Menu
        items={menuItems}
        open={isVisibleMenu}
        onClose={menuHide}
      ></Menu>

      <LocalContainer>
        <Header pages={pages} onClickMenu={menuOpen}></Header>

        <Box height={"100%"} sx={{ padding: 2, overflow: "auto" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Content>
                <Outlet />
              </Content>
            </Grid>
          </Grid>
        </Box>

        <Footer></Footer>
      </LocalContainer>
    </ThemeContext.Provider>
  )
}

export default App
