import React, { FunctionComponent, useState } from "react";
import { IOmrFile, IOmrListFormProps } from "../../common/models/omrModels";
import {
  AppBar,
  Button,
  Dialog,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { string } from "yup";
import InstitutionService from "../institution-services/institutionService";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const InistituteOmrImageList: FunctionComponent<IOmrListFormProps> = (
  props: IOmrListFormProps
) => {
  const { omrs, handleDeleteOmr } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [viewFile, setViewFile] = useState<null | IOmrFile>(null);
  const open = Boolean(anchorEl);
  const openDialog = Boolean(viewFile);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDialogClose = () => {
    setViewFile(null);
  };

  function handleViewLarge(
    event: React.MouseEvent<HTMLElement>,
    omrFile: IOmrFile
  ): void {
    setAnchorEl(null);
    setViewFile(omrFile);
  }

  function handleDelete(
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    omrFile: IOmrFile
  ) {
    setAnchorEl(null);
    handleDeleteOmr(omrFile);
  }

  return (
    <>
      <ImageList
        sx={{ width: "100%", height: 450 }}
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        {omrs.map((omrFile: IOmrFile) => (
          <div style={{ width: 200, height: 200 }}>
            <ImageListItem
              key={omrFile.fileId}
              sx={{ maxWidth: 200, maxHeight: 200 }}
            >
              <div style={{ width: 200, height: 200, cursor: "pointer" }}>
                <img
                  src={omrFile.filePath}
                  srcSet={`${omrFile.filePath}`}
                  alt={omrFile.fileName}
                  loading="lazy"
                  height={"100%"}
                  width={"100%"}
                  onClick={(event) => {
                    handleViewLarge(event, omrFile);
                  }}
                />
              </div>
              <ImageListItemBar
                title={omrFile.fileName}
                subtitle={omrFile.processingStatus}
                actionIcon={
                  <IconButton
                    sx={{ color: "white" }}
                    aria-label={`info about ${omrFile.fileName}`}
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
                sx={{ maxWidth: 200 }}
              />
            </ImageListItem>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={(event) => {
                  handleViewLarge(event, omrFile);
                }}
              >
                <ListItemIcon>
                  <ZoomOutMapIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>View Large</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={(event) => {
                  handleDelete(event, omrFile);
                }}
              >
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        ))}
      </ImageList>

      {openDialog && (
        <Dialog
          fullScreen
          open={openDialog}
          onClose={handleDialogClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleDialogClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {viewFile?.fileName}
              </Typography>
              <Button
                autoFocus
                color="inherit"
                onClick={(event) => {
                  handleDelete(event, viewFile as IOmrFile);
                }}
              >
                Delete
              </Button>
            </Toolbar>
          </AppBar>
          <Grid container spacing={2} style={{ backgroundColor: "#f5f5f5" }}>
            <Grid
              item
              xs={7}
              style={{
                marginTop: 35,
                backgroundColor: "white",
                marginLeft: 35,
                padding: 15,
              }}
            >
              <div style={{ height: "600px" }}>
                <img
                  src={viewFile?.filePath}
                  srcSet={`${viewFile?.filePath}`}
                  alt={viewFile?.fileName}
                  loading="lazy"
                  height={"100%"}
                  width={"100%"}
                />
              </div>
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                marginTop: 35,
                backgroundColor: "white",
                marginLeft: 35,
                padding: 15,
              }}
            >
              <div style={{ height: "600px" }}>Test</div>
            </Grid>
          </Grid>
        </Dialog>
      )}
    </>
  );
};
