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

const menuItems = [
  {id: 1, text: "Lab1", path: "lab/1"},
  {id: 2, text: "Lab2", path: "lab/2"}
]

function App() {
  return (
    <LocalContainer>
      <Header></Header>

      <Box sx={{ pt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Menu
              items={menuItems}
            ></Menu>
          </Grid>
          <Grid item xs={10}>
            <Content>
              <Outlet />
            </Content>
          </Grid>
        </Grid>
      </Box>

      <Footer></Footer>
    </LocalContainer>
  )
}

export default App
