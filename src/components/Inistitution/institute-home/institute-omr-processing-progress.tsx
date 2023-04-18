import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
export const InistituteOMRProcessingProgress: FunctionComponent = () => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              OMR Processing PROGRESS
            </Typography>
            <Typography color="textPrimary" variant="h4">
              0%
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "warning.main",
                height: 56,
                width: 56,
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress value={0} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};
