import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { FunctionComponent } from 'react';
import { StudentMenu } from './StudentMenu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Toolbar } from '@mui/material';

export const Student = (element: any) => {
  const mdTheme = createTheme();
  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />

      <StudentMenu />
      <Box
        component="main"
        sx={{
          bgcolor: "#f5f5f5",
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml: 2, paddingTop: 11 }}>
          <Grid container spacing={3}>
            <Box component="main" sx={{ flexGrow: 1 }}>
              {element.children}
            </Box>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>


  );
};

