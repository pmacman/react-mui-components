import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { theme } from './theme';

export default function Root() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container maxWidth='lg' sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
