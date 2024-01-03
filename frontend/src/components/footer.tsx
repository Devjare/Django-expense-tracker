import {
    Container,
  Grid, Typography
} from "@mui/material"

export default function Footer() {
  return (
  <div>
      <Container>
      <Grid container 
        maxWidth="xl" 
        direction="row" 
        justifyContent="center"
        alignItems="center">
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'success',
              textDecoration: 'none',
            }}
          >
          Expense Tracker by @Devjare
        </Typography>
      </Grid>
      </Container>
  </div>
  )
}
