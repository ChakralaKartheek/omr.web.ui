import {
  Avatar,
  Box,
  Button,
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
} from "@mui/material";
import { FunctionComponent } from "react";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { red, yellow } from "@mui/material/colors";
import FolderZipIcon from "@mui/icons-material/FolderZip";
export const InistituteDownloads: FunctionComponent = (props) => {
  const handleModelPapersClick = () => {
    const link = document.createElement("a");
    link.download = `ModelPapers.zip`;
      link.href = "../../../documents/downloads/MODEL_PAPERS.zip";
    link.click();
  };
  const handleUserGuideClick = () => {
    const link = document.createElement("a");
    link.download = "UserGuide.pdf";
    link.href = "../../../documents/downloads/UserGuide.pdf";
    link.click();
  };
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ flex: "1 0 auto" }}>
      <Typography color="textSecondary" gutterBottom variant="overline">
              Downloads
            </Typography>
        <MenuList style={{paddingTop:'0', paddingBottom:'0'}}>
          <MenuItem style={{paddingTop:'0', paddingBottom:'0'}}>
            <Button
              onClick={handleUserGuideClick}
              size="large"
              startIcon={
                <PictureAsPdfIcon fontSize="inherit" sx={{ color: red[500] }} />
              }
            >
              User Guide
            </Button>
          </MenuItem>
          <MenuItem style={{paddingTop:'0', paddingBottom:'0'}}>
            <Button
              onClick={handleModelPapersClick}
              size="large"
              startIcon={
                <FolderZipIcon fontSize="inherit" sx={{ color: yellow[800] }} />
              }
            >
              Model Papers
            </Button>
          </MenuItem>
         
        </MenuList>
      </CardContent>
    </Card>
  );
};
