import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const AboutMe = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item md={4} sm={12} container justifyContent="center">
          <Box
            component="img"
            sx={{
              height: 260,
              width: 260
            }}
            alt="Avatar"
            src="public/avatar.jpg"
          />
        </Grid>
        <Grid item md={8} sm={12}>
          <Typography variant="body1" gutterBottom>
            Lorem Ipsum - это текст - рыба, часто используемый в печати и вэб-дизайне. 
            Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. 
            В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, 
            используя Lorem Ipsum для распечатки образцов. 
            Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. 
            Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 
            60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AboutMe