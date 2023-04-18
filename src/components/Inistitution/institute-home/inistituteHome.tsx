import {
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Link,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { FunctionComponent } from "react";
import { InstitutionNavMenu } from "../institution-navmenu/institutionNavMenu";

import { InistituteOMRCount } from "./institute-omr-count";
import { InistituteOMRProcessingProgress } from "./institute-omr-processing-progress";
import { InistituteDownloads } from "./institute-downloads";
import { Inistitution } from "../institution";
import { InistituteUserGuide } from "./institute-user-guide";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const InistitutionHome: FunctionComponent = () => {
  return (
    <Inistitution>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <InistituteOMRCount></InistituteOMRCount>
        </Grid>
        <Grid item xs={4}>
          <InistituteOMRProcessingProgress></InistituteOMRProcessingProgress>
        </Grid>
        
        <Grid item xs={4}>
          <InistituteDownloads></InistituteDownloads>
        </Grid>
      </Grid>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ mt: 4 }}
      >
        <Grid item xs={6}>
          <InistituteUserGuide></InistituteUserGuide>
        </Grid>
       
        <Grid item xs={3}>
         
        </Grid>
      </Grid>
      {/* <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ mt: 4 }}
      >
        <Grid item xs={4}>
           <InistituteAboutNAAT></InistituteAboutNAAT> 
        </Grid>
        <Grid item xs={4}>
           <InistituteAboutNISA></InistituteAboutNISA> 
        </Grid>
        <Grid item xs={4}>
          <InistituteAboutEAbhyas></InistituteAboutEAbhyas>
        </Grid>
      </Grid> */}
    </Inistitution>
  );
};
