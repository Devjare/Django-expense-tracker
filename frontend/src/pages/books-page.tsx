import { Grid, Typography } from '@mui/material';

export default function BooksPage() {
  return (
    <Grid container 
      maxWidth="xl" 
      direction="row" 
      justifyContent="center"
      alignItems="center">
      <Typography variant="h5" component="h5">
        BookPage
      </Typography>
    </Grid>
  );
}
