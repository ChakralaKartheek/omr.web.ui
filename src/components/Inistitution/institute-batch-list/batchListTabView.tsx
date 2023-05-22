import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import {
  IBatchListFormProps,
  IOmrBatchDetails,
  IOmrFile,
} from "../../common/models/omrModels";
import InstitutionService from "../institution-services/institutionService";
import { toast } from "react-toastify";
import { TokenUserHelper } from "../../common/services/token-user-service";
import { InistituteOmrImageList } from "./omrImageListView";
import {
  Button,
  Grid,
  LinearProgress,
  LinearProgressProps,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export const InistituteBatchListTabView: FunctionComponent<
  IBatchListFormProps
> = (props: IBatchListFormProps) => {
  const { batchList } = props;
  const tokenUser = TokenUserHelper.Get();
  const [value, setValue] = useState<number>(0);
  const [omrFiles, setOmrFiles] = useState<IOmrFile[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [totalUploadFiles, setTotalUploadFiles] = useState<number>(0);
  const [processedFiles, setProcessedFiles] = useState<number>(0);
  React.useEffect(() => {
    if (totalUploadFiles == 0) {
      return;
    } else {
      let currentProgress = (100 / totalUploadFiles) * processedFiles;
      setProgress(currentProgress);
    }
  }, [processedFiles]);

  const loadOmrList = (index: number) => {
    let batchDetails = batchList[index];
    if (batchDetails != null) {
      InstitutionService.getOmrList(tokenUser.UserId, batchDetails.batchId)
        .then((res) => {
          if (res.status !== 200) {
            toast.error("Error in retriving batch list");
          }

          setOmrFiles(res.data);
        })
        .catch(() => {
          toast.error("Error in retriving batch list");
        });
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    loadOmrList(value);
  }, []);
  useEffect(() => {
    loadOmrList(value);
  }, [value]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>): void => {
    let batchDetails = batchList[value];

    let files = event.target.files as FileList;
    setTotalUploadFiles(files.length);
    setProcessedFiles(0);
    for (let i = 0; i < files.length; i++) {
      let formData = new FormData();
      let file = files.item(i) as File;
      formData.append(file.name, file);
      InstitutionService.uploadOmrs(
        tokenUser.UserId,
        batchDetails.batchId,
        formData
      )
        .then((res) => {
          if (res.status != 200) {
            toast.error("Error in uploading omrs");
          }
        })
        .catch((ex) => {
          toast.error("Error in uploading omrs");
        })
        .finally(() => {
          setProcessedFiles((prevCount) => (prevCount+ 1));
          console.log(processedFiles);
        });
    }
  };
  const deleteOmr = ( omrFile: IOmrFile) => {
    InstitutionService.deleteOmr(tokenUser.UserId, omrFile.fileId)
      .then((res) => {
        if (res.status !== 200) {
          toast.error('error in delete omr');
        }
        toast.success('omr file deleted successfully');
        loadOmrList(value);
      })
      .catch(() => {
        toast.error('error in delete omr');
      });
  };
  return (
    <> 
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 580,
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        indicatorColor="secondary"
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
      
        {batchList.map((batch: IOmrBatchDetails, index: number) => (
          <Tab label={batch.batchName} {...a11yProps(index)} />
        ))}
      </Tabs>
     
      {batchList.map((batch: IOmrBatchDetails, index: number) => (
        <TabPanel value={value} index={index}>
          <div>
            <Grid container spacing={2}>
              <Grid
                item
                xs={8}
                sx={{ paddingTop: 0 }}
                style={{ paddingTop: 0 }}
              >
              {(totalUploadFiles !==0) &&  <LinearProgressWithLabel value={progress} />}
              </Grid>
              <Grid
                item
                xs={4}
                sx={{ paddingTop: 0 }}
                style={{ paddingTop: 0 }}
              >  <Button
                  variant="outlined"
                  component="label"
                  sx={{ alignContent: "flex-start" }}
                  startIcon={<AddIcon />}
                >
                  Add Batch
                  
                </Button>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ alignContent: "flex-end", marginLeft:"25px" }}
                  startIcon={<AddIcon />}
                >
                  Add Files
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleUpload}
                  />
                </Button>
              
              </Grid>
            </Grid>
          </div>
          <InistituteOmrImageList
            key={index}
            omrs={omrFiles}
            handleDeleteOmr={deleteOmr}
          ></InistituteOmrImageList>
        </TabPanel>
      ))}
    </Box>
    </>
  );
};
