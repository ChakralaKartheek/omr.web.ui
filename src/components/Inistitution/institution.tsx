import * as React from "react";
import { FunctionComponent } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Box from "@mui/material/Box";
import { Container, Grid } from "@mui/material";
import { InstitutionNavMenu } from "./institution-navmenu/institutionNavMenu";
import InstituteFooter from "./institute-footer/instituteFooter";

export const Inistitution = (element: any): JSX.Element => {
  return (
    <>
      <InstitutionNavMenu />
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
        <InstituteFooter />
      </Box>
     
    </>
  );
};
