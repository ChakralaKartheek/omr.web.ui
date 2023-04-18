import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { FunctionComponent } from "react";
import { green } from "@mui/material/colors";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
export const InistituteStudentsTemplate2: FunctionComponent = (props) => {
  const handleDownloadClick = () => {
    const link = document.createElement("a");
    link.download = `StudentListTemplate.xlsx`;
    link.href = "../../../documents/StudentListTemplate.xlsx";
    link.click();
  };
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="h5" sx={{ textAlign: "center" }}>
          Student Template
          <Button
            onClick={handleDownloadClick}
            size="large"
            startIcon={
              <FileDownloadIcon fontSize="inherit" sx={{ color: green[500] }} />
            }
            sx={{ color: green[500] }}
          >            
          </Button>
        </Typography>        
      </CardContent>
    </Card>
  );
};
