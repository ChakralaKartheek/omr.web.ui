import { Margin } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";
import { Guid } from "guid-typescript";
import { FunctionComponent, useEffect, useState } from "react";
import FileUpload from "react-material-file-upload";
import { Inistitution } from "../institution";
import InstitutionStudentService from "../institution-services/institutionService";
import { InistituteStudentsTemplate2 } from "./institute-students-template";
import CloseIcon from '@mui/icons-material/Close';

export const InistituteStudentUpload: FunctionComponent = (props) => {

  const [files, setFiles] = useState<File[]>([]);
  const [valid, setValid] = useState<boolean>(false);
  const [disableValidate, setDisableValidate] = useState<boolean>(false);
  const [errorMsgs, setErrorMsgs] = useState<string[]>([]);
  const [trailGuid, setTrialGuid] = useState<Guid>(Guid.create());
  const [successAlert, setSuccessAlert] = useState<boolean>(false);

  useEffect(() => {
    setDisableValidate(files.length === 0);
    setErrorMsgs([]);

    setSuccessAlert(false);
  }, [files]);

  const handleValidateClick = () => {

    setSuccessAlert(false);
    if (files.length > 0) {
      InstitutionStudentService.validateStudents(files[0], trailGuid).then((data) => {
        if (data?.data?.result?.list.length) {
          const messages = data?.data?.result?.list;
          setErrorMsgs(messages);

        } else {
          setFiles([]);
          setValid(true);
        }
      });
    }
  }

  const handleSaveClick = () => {
    if (valid) {
      InstitutionStudentService.saveUploadedStudents(trailGuid).then((data) => {
        setSuccessAlert(true);
        setTrialGuid(Guid.create());
        setValid(false);
        setTimeout(() => {
          setSuccessAlert(false);
        }, 3000);
      });
    }
  }

  return (
    <Inistitution>
      <Grid container>
        <Grid item xs={12} md={12}>
          <InistituteStudentsTemplate2></InistituteStudentsTemplate2>
        </Grid>
      </Grid>
      <Divider />
      <br />
      <Grid container>
        <Grid item xs={12} md={12}>
          <FileUpload value={files} onChange={setFiles} />
        </Grid>
      </Grid>
      <Divider />
      <br />
      <div style={{ textAlign: "center" }}>
        <Button variant={disableValidate ? "outlined" : "contained"} disabled={disableValidate} size="medium" onClick={handleValidateClick}
          color={disableValidate ? "secondary" : "info"}>Validate
        </Button>
      </div>
      <br />
      <Grid container>
        <Grid item xs={12} md={12}>

          <List sx={{ width: '100%', bgcolor: 'background.paper' }} hidden={!errorMsgs.length}>
            <ListItem style={{ padding: 10 }}>Please fix the errors and re-upload the file</ListItem>
            {errorMsgs.map((value) => (
              <ListItem
                key={value}
                disableGutters
              >
                <ListItemText primary={`${value}`} color="error" style={{ padding: 10, fontStyle: "italic", color: "red" }} />
              </ListItem>
            ))}
          </List>  </Grid>
      </Grid>

      <br />
      <Collapse in={successAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccessAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Students data Saved Successfully!
        </Alert>
      </Collapse>

      <div style={{ textAlign: "center" }} hidden={!valid}>

        <Card sx={{ height: "100%" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6" sx={{ textAlign: "center" }}>
              File Validated! No issues found
              <Button variant="contained" size="medium" onClick={handleSaveClick} style={{ marginLeft: "10px" }}
                color="success">Confirm & Save
              </Button>
            </Typography>
          </CardContent>
        </Card>


      </div>
    </Inistitution>
  );
};
