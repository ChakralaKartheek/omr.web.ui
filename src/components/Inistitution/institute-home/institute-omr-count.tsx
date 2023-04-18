import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InstitutionStudentService from "../institution-services/institutionService";
import { IAPIResponse, IHTTPResponse } from "../../common/models/httpModels";
import { toast } from "react-toastify";
export const InistituteOMRCount: FunctionComponent = (props) => {
  const [studentCount, setStudentCount] = useState<number>(0);
  useEffect(() => {
    InstitutionStudentService.getOMRCount()
      .then((res: IHTTPResponse<any>) => {
        if (res.status !== 200) {
         
          toast.error("Error in retriving omr count");
        }
        if (res.data !== null || res.data !== undefined) {
          setStudentCount(res.data.data);
        }
      })
      .catch(() => {
        toast.error("Error in Fetching Student Count");
      });
  }, []);
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              OMR Count
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {studentCount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                height: 56,
                width: 56,
              }}
            >
              <PeopleAltIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
