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
import { FunctionComponent } from "react";
import { Student } from "./Student";
import { StudentInfo } from "./StudentInfo";


export const StudentHome: FunctionComponent = () => {
  return (
    <Student>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <StudentInfo></StudentInfo>
        </Grid>
      </Grid>
    </Student>

  );
};
