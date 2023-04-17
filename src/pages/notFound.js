import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
const NotFound = () => {
  return (
    <Container
      sx={{
        mt: 25,
        height: '50vh',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
      component="main"
      maxWidth="md"
    >
      <Typography
        color="#f72536"
        textAlign="center"
        component="h1"
        variant="h1"
      >
        PAGE NOT FOUND
      </Typography>
    </Container>
  );
};

export default NotFound;
