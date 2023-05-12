import * as React from "react";
import { FunctionComponent, useState, useEffect } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Box from "@mui/material/Box";
import { Container, Grid } from "@mui/material";
import { InstitutionNavMenu } from "./institution-navmenu/institutionNavMenu";
import InstituteFooter from "./institute-footer/instituteFooter";
import InstitutionSessionService from "./institution-services/institutionSessionService";
import { IInstitutionProfile } from "./institution-models/institutionProfile";
import { IOmrBatchDetails } from "../common/models/omrModels";
import InstitutionService from "./institution-services/institutionService";
import { toast } from "react-toastify";

export const Inistitution = (element: any): JSX.Element => {
  const [profile, setProfile] = useState<IInstitutionProfile>();
  const [batchDetails, setBatchDetails] = useState<IOmrBatchDetails[]>();

  const loadInstitutionSession = () => {
    if (!InstitutionSessionService.isInstitutionSessionExist()) {
      InstitutionService.getSession()
        .then((res) => {
          if (res.status !== 200) {
            toast.error("Error in gettin the Institution Session");
          }
          var instituionSession = res.data;
          setProfile(instituionSession.profile);
          setBatchDetails(instituionSession.batchDetails);
          InstitutionSessionService.updateBatchDetails(
            instituionSession.batchDetails
          );
          InstitutionSessionService.updateUserDetails(
            instituionSession.profile
          );
        })
        .catch((ex) => {
          toast.error("Error in gettin the Institution Session");
        });
    }
  };

  useEffect(() => {
    loadInstitutionSession();
  }, []);

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
        <Container  maxWidth={false}  sx={{ mt: 4, mb: 4,ml:4,mr:0, paddingTop: 11, maxWidth:1278 }}>
          <Grid container spacing={3}>
            <Box component="main" sx={{ flexGrow: 1 }}>
              {element.children}
            </Box>
          </Grid>
        </Container>
        {/* <InstituteFooter /> */}
      </Box>
    </>
  );
};
