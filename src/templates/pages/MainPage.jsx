import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import { Fragment } from 'react'

const heroes = [
  {
    id: 1,
    title: "Геральт",
    img_src: "public/witcher/geralt.webp",
    img_alt: "Geralt",
    text: "Ге́ральт из Ривии  — главный герой фэнтезийного литературного цикла «Ведьмак», написанного Анджеем Сапковским. Геральт — один из последних «ведьмаков», охотников на монстров; перенесённые «мутации» придают ему сверхчеловеческие способности."
  },
  {
    id: 2,
    title: "Цири",
    img_src: "public/witcher/ciri.webp",
    img_alt: "Ciri",
    text: "Цири также известная, как Zireael — персонаж цикла «Ведьмак» Анджея Сапковского — принцесса Цинтры, Бругге, герцогиня Соддена, наследница Инис Ард Скеллиг и Инис Ан Скеллиг, сюзерен Аттре и Абб Ярра, также известная как Львёнок из Цинтры, внучка королевы Калантэ. Она является одним из главных персонажей цикла наряду с Геральтом и Йеннифэр."
  },
  {
    id: 3,
    title: "Регис",
    img_src: "public/witcher/regis.jpg",
    img_alt: "Regis",
    text: "Регис — один из центральных персонажей литературного цикла «Ведьмак», написанного Анджеем Сапковским, а также дополнения «Кровь и вино» для компьютерной игры «Ведьмак 3: Дикая Охота». Вампир, друг и соратник Геральта из Ривии."
  },
  {
    id: 4,
    title: "Золтан",
    img_src: "public/witcher/zoltan.jpg",
    img_alt: "Zoltan",
    text: "Золтан Хивай — один из основных персонажей литературной саги и игровой серии, деловитый предприниматель-краснолюд, наёмник, один из лучших друзей Геральта, а также герой множества трактирных баек и пересудов."
  }
]

const MainPage = () => {
  return (
    <Box>
      <Stack spacing={2}>
        {
          heroes.map((hero) => {
            return (
              <Fragment key={hero.id}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>{hero.title}</Typography>
                  </Grid>

                  <Grid item md={4} sm={12}>
                    <Box
                      component="img"
                      sx={{
                        height: "100%",
                        width: "100%"
                      }}
                      alt={hero.img_alt}
                      src={hero.img_src}
                    />
                  </Grid>
                  <Grid item md={8} sm={12}>
                    <Typography>{hero.text}</Typography>
                  </Grid>
                </Grid>

                <Divider variant="middle"/>
              </Fragment>
            )
          })
        }
      </Stack>
    </Box>
  )
}

export default MainPage