import { Box, Container, Grid } from "@mui/material"
import { FacilitatorNavMenu } from "./facilitator-navmenu/FacilitatorNavMenu"

export const Facilitator = (element: any): JSX.Element => {
    return (
        <>
      <FacilitatorNavMenu />
      <Box
        component="main"
        sx={{
          bgcolor: "#f5f5f5",
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, paddingTop: 11 }}>
          <Grid container spacing={3}>
            <Box component="main" sx={{ flexGrow: 1 }}>
              {element.children}
            </Box>
          </Grid>
        </Container>
        
      </Box>
     
    </>
    )
}