import {
  Container,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, FunctionComponent, useState } from "react";
import InstituteProfileService from "../institution-services/instituteProfileService";
import CookieHelper from "../../common/services/cookieHelper";
import { FormType, withForm } from "../../common/ui-form";
import { getInstitueRegistrationControlState } from "../institute-registration/institueRegistrationControlState";
import { InistitutionRegistrationFieldSet } from "../institute-registration/instituteRegistrationFieldSet";
import {
  IInstituteRegisterationRequest,
  IInstituteRegistrationFormProps,
} from "../institute-registration/instituteRegistrationModels";
import { getInistitutionRegistrationFormValidations } from "../institute-registration/instituteRegistrationValdiations";
import { InstitutionNavMenu } from "../institution-navmenu/institutionNavMenu";
import { Inistitution } from "../institution";

const InistitutionRegistrationForm = withForm<
  IInstituteRegistrationFormProps,
  FormType<IInstituteRegistrationFormProps>
>(InistitutionRegistrationFieldSet);

export const InistitutionProfile: FunctionComponent = () => {
  const [initialValues, setInitialValues] =
    useState<IInstituteRegisterationRequest>();

  useEffect(() => {
    var canAccess = CookieHelper.getCookie("authenticate_user");
    if (!canAccess) {
      CookieHelper.logOut();
    } else {
      InstituteProfileService.instituteProfile(canAccess).then((result) => {
        console.log(result);
        if (result.data) {
          setInitialValues(result.data.data);
        }
      });
    }
  }, []);
  return (
    <Inistitution>
      <Grid
        xs={12}
        sm={12}
        md={12}
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "0.625rem",
          p: "0.325rem",
          mb: "0.625rem",
        }}
      >
        <Grid
          xs={12}
          sm={12}
          md={12}
          sx={{
            border: "0px solid #e0e0e0",
            borderRadius: "0.625rem",
            p: "0.325rem",
            mb: "0.625rem",
          }}
        >
          <h3 style={{ textTransform: "uppercase", color: "#757575" }}>
            {" "}
            Credential Info
          </h3>
          <TextField
            disabled
            id="txtuserName"
            label="User Name"
            value={initialValues?.userName}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            disabled
            id="txtpassword"
            label="Password"
            type="password"
            value={initialValues?.password}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            disabled
            id="txtInstituteName"
            label="Instititue Name"
            value={initialValues?.name}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid
          xs={12}
          sm={12}
          sx={{
            border: "0px solid #e0e0e0",
            borderRadius: "0.625rem",
            p: "0.325rem",
            mb: "0.625rem",
          }}
        >
          <h3 style={{ textTransform: "uppercase", color: "#757575" }}>
            Institute Info
          </h3>
          <TextField
            disabled
            id="txtCode"
            label="Code"
            value={initialValues?.code}
            InputLabelProps={{ shrink: true }}
          />
         
        </Grid>
        <Grid
          xs={12}
          sm={12}
          sx={{
            border: "0px solid #e0e0e0",
            borderRadius: "0.625rem",
            p: "0.325rem",
            mb: "0.625rem",
          }}
        >
          <h3 style={{ textTransform: "uppercase", color: "#757575" }}>
            {" "}
            Address Info
          </h3>
          <TextField
            disabled
            id="txtAddress"
            label="Address"
            value={initialValues?.address}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            disabled
            id="txtDistrict"
            label="district"
            value={initialValues?.district}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            disabled
            id="txtState"
            label="State"
            value={initialValues?.state}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid
          xs={12}
          sm={12}
          sx={{
            border: "0px solid #e0e0e0",
            borderRadius: "0.625rem",
            p: "0.325rem",
            mb: "0.625rem",
          }}
        >
          <h3 style={{ textTransform: "uppercase", color: "#757575" }}>
            {" "}
            Contact Info
          </h3>
          <TextField
            disabled
            id="txtContactName"
            label="Contact Name"
            value={initialValues?.contactName}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            disabled
            id="txtEmail"
            label="Email"
            value={initialValues?.email}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            disabled
            id="txtMobile"
            label="Mobile"
            value={initialValues?.mobile}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid
          xs={12}
          sm={12}
          sx={{
            border: "0px solid #e0e0e0",
            borderRadius: "0.625rem",
            p: "0.325rem",
            mb: "0.625rem",
          }}
        >
          <h3 style={{ textTransform: "uppercase", color: "#757575" }}>
            {" "}
            Alternative Contact Info
          </h3>
          <TextField
            disabled
            id="txtcoOrdinatorName"
            label="Co-OrdinatorName"
            value={initialValues?.coOrdinatorName}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            disabled
            id="txtcoOrdinatorEmail"
            label="Co-OrdinatorEmail"
            value={initialValues?.coOrdinatorEmail}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            disabled
            id="txtcoOrdinatorMobile"
            label="Co-OrdinatorMobile"
            value={initialValues?.coOrdinatorMobile}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      {/*<Grid xs={12}>*/}
      {/*    <TextField disabled id="txtStudentCount" label="StudentCount" value={initialValues?.studentCount} InputLabelProps={{ shrink: true, }} />*/}
      {/*    <TextField disabled id="txtCoCurriculum" label="Co-Curriculum" value={initialValues?.coCurriculum} InputLabelProps={{ shrink: true, }} />*/}
      {/*    <TextField disabled id="txtisEmailVerified" label="IsEmail Verified" value={initialValues?.isEmailVerified} InputLabelProps={{ shrink: true, }} />*/}
      {/*    <TextField disabled id="txtProgram" label="Program" value={initialValues?.program} InputLabelProps={{ shrink: true, }} />*/}
      {/*    <TextField disabled id="txtType" label="Type" defaultValue="Institute" value={initialValues?.type} InputLabelProps={{ shrink: true, }} />*/}
      {/*</Grid>*/}
    </Inistitution>
  );
};
