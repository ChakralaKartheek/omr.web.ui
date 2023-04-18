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
  CardMedia,
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
import { Student } from "./Student";

export const StudentExam: FunctionComponent = () => {
  return (
    <Student>
      <Typography color="textSecondary" gutterBottom variant="overline">Exam Form:</Typography>
      <CardMedia
        component="iframe"
        sx={{ height: "80vh", width: "99%" }}
        src="https://docs.google.com/forms/d/e/1FAIpQLSeN1P3B7iti2CiLZ8fE_lACFRKDAyqwWhmbpXQfcbi-rAIyDg/viewform?usp=sf_link"
      />

    </Student >
  );
};
