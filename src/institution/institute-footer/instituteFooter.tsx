import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Card, CardContent } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="http://www.eabhyasacademy.com">
      eAbhyasAcademy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function InstituteFooter() {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography variant="body1">Bestviewed in desktop only.</Typography>
          <Copyright />
        </Container>
      </CardContent>
    </Card>
  );
}
