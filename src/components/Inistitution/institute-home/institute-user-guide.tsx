import {
    Card,
    CardContent,
    Typography,
  } from "@mui/material";
  import { FunctionComponent } from "react";
  export const InistituteUserGuide: FunctionComponent = (props) => {
    return (
      <Card sx={{ height: "100%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography color="textSecondary" gutterBottom variant="overline">
              User Guide
            </Typography>
        <iframe width="550" height="300" src="https://www.youtube.com/embed/epAFDEJImrU"> 
            </iframe>
        </CardContent>
      </Card>
    );
  };
  