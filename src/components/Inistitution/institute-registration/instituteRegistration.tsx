import { Container, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { FunctionComponent } from "react";
import { IInstituteRegistrationFormProps } from "./instituteRegistrationModels";
import { FormType, withForm } from "../../common/ui-form";
import { InistitutionRegistrationFieldSet } from "./instituteRegistrationFieldSet";
import { getInistitutionRegistrationFormValidations } from "./instituteRegistrationValdiations";
import { getInstitueRegistrationControlState } from "./institueRegistrationControlState";

const InistitutionRegistrationForm = withForm<
  IInstituteRegistrationFormProps,
  FormType<IInstituteRegistrationFormProps>
>(InistitutionRegistrationFieldSet);

export const InistitutionRegistration: FunctionComponent = () => {
  const intialValues = (): IInstituteRegistrationFormProps => {
      return {
          instituteInfo: {
              address: "",
              district: '',
              name: "",
              state: '',
          },
          primaryContact: {
              email: "",
              mobileNumber: "",
              name: "",
          },
          alternativeContact: {
              email: "",
              mobileNumber: "",
              coordinateName: "",
          },
          credentials: {
              userName: "",
              passWord: "",
              confirmPassWord:""
          }
      };
  };
  return (
      <>
          <Container component="main" maxWidth="md" sx={{ paddingTop: "16px", mb: 4 }}>
        <Box
          sx={{
            width: "100%",
            height: "120px",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
           <img src="../sat-logo.jpg" style={{ height: "inherit" }} /> 
        </Box>
        <Box sx={{ width: "100%" }}>
          <InistitutionRegistrationForm
            enableReintialize
            formValues={intialValues()}
            getValidationSchema={(v: IInstituteRegistrationFormProps) =>
              getInistitutionRegistrationFormValidations(v)
            }
            getControlState={(v: IInstituteRegistrationFormProps) =>
              getInstitueRegistrationControlState(v)
            }
          />
        </Box>
        
      </Container>
    </>
  );
};
