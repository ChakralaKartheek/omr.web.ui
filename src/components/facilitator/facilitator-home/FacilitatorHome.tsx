import { Grid } from "@mui/material";
import { FunctionComponent } from "react";
import { InistituteDownloads } from "../../Inistitution/institute-home/institute-downloads";
import { Facilitator } from "../facilitator";
import { FacilitatorSchoolCount } from "./facilitator-schools-count";
import { FacilitatorStudentCount } from "./facilitator-students-count";

export const FacilitatorHome: FunctionComponent = () => {
  return (
    <Facilitator>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={3}>
          <FacilitatorSchoolCount></FacilitatorSchoolCount>
        </Grid>
        <Grid item xs={3}>
          <FacilitatorStudentCount></FacilitatorStudentCount>
        </Grid>
        <Grid item xs={3}>
          
        </Grid>
        <Grid item xs={3}>
          <InistituteDownloads></InistituteDownloads>
        </Grid>
      </Grid>
    </Facilitator>
  );
};
