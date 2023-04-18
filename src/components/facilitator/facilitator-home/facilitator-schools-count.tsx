import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { IAPIResponse, IHTTPResponse } from "../../common/models/httpModels";
import { toast } from "react-toastify";
import FacilitatorService from "../facilitator-services/facilitatorService";
export const FacilitatorSchoolCount: FunctionComponent = (props) => {
  const [schoolsCount, setSchoolsCount] = useState<number>(0);
  useEffect(() => {
    FacilitatorService.getInstitutionCount()
      .then((res: IHTTPResponse<IAPIResponse<number>>) => {
        if (res?.data?.errors?.length > 0) {
          let errorMessage = "";
          res?.data?.errors.forEach((i) => {
            if (errorMessage !== "") {
              errorMessage += "\n";
            }
            errorMessage += i.field + " : " + i.message;
          });
          toast.error(errorMessage);
        }
        if (res.data !== null || res.data !== undefined) {
            setSchoolsCount(res.data.data);
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
              Schools Count
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {schoolsCount}
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
