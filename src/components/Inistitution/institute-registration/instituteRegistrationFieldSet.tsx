import {
  Box,
  Container,
  TextField,
  Autocomplete,
  Card,
  CardContent,
  Stepper,
  StepLabel,
  Step,
  Button,
  Typography,
  StepContent,
  makeStyles,
  createStyles,
  Theme,
  Paper,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { spacing } from "@mui/system";
import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { FormType } from "../../common/ui-form";
import {
  IInstituteRegistrationFormProps,
  InstituteRegistrationControlState,
  IInstituteContact,
  IInstituteRegisterationRequest,
} from "./instituteRegistrationModels";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import {
  getAllStates,
  getDistricts,
} from "../../common/utilities/states-districts";
import { CommonConstants } from "../../common/constants/common-constants";
import InstituteRegisterService from "../institution-services/instituteRegistrationService";
import { IAPIResponse, IHTTPResponse } from "../../common/models/httpModels";
import { LoadingButton } from "@mui/lab";

import SaveIcon from "@mui/icons-material/Save";
export type SelectList = { value: string | number; display: string };
export const InistitutionRegistrationFieldSet: FunctionComponent<
  FormType<IInstituteRegistrationFormProps>
> = ({
  values,
  handleBlur,
  handleChange,
  errors,
  isValid,
  dirty,
  getValidationSchema,
  getControlState,
  isRequired,
  ...props
}) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    
    const [states, setStates] = React.useState<{ label: string; id: string }[]>(
      []
    );
    const [districts, setDistricts] = React.useState<
      { label: string; id: string }[]
    >([]);
    const [districtValue, setDistrictValue] =
      React.useState<{ label: string; id: string }>();

    const [isRegistrationProgress, SetRegistrationProgress] =
      useState<boolean>(false);

    useEffect(() => {
      const statesData = getAllStates();
      setStates(statesData);
    }, []);

    useEffect(() => {
      setDistricts([]);
      setDistrictValue(undefined);
      const districtsData = getDistricts(values.instituteInfo.state) ?? [];
      setDistricts(districtsData);
      handleChange({
        target: {
          name: "instituteInfo.district",
          value: "",
        },
      });
    }, [values.instituteInfo.state]);

    useEffect(() => {
      const dtValue = districts.find(
        (i) => i.id === values.instituteInfo.district
      );
      setDistrictValue(dtValue);
    }, [values.instituteInfo.district]);

    const isStepOptional = (step: number) => {
      return step === 2;
    };

    const isStepSkipped = (step: number) => {
      return skipped.has(step);
    };
    const isStepOneHasErrors = (): boolean => {
      if (errors.instituteInfo === undefined) return false;
      if (
        errors.instituteInfo?.name !== "" ||
        errors.instituteInfo?.address !== "" ||
        errors.instituteInfo?.district !== "" ||
        errors.instituteInfo?.state !== ""
      )
        return true;

      return false;
    };

    const isStepTwoHasErrors = (): boolean => {
      if (errors.primaryContact === undefined) return false;
      if (
        errors.primaryContact?.name !== "" ||
        errors.primaryContact?.email !== "" ||
        errors.primaryContact?.mobileNumber !== ""
      )
        return true;

      return false;
    };

    const isStepThreeHasErrors = (): boolean => {
      if (errors.alternativeContact === undefined) return false;
      if (
        errors.alternativeContact?.coordinateName !== "" ||
        errors.alternativeContact?.email !== "" ||
        errors.alternativeContact?.mobileNumber !== ""
      )
        return true;

      return false;
    };

    const isStepFourHasErrors = (): boolean => {
      if (errors.credentials === undefined) return false;
      if (
        errors.credentials?.userName !== "" ||
        errors.credentials?.passWord !== "" ||
        errors.credentials?.confirmPassWord !== ""
      )
        return true;

      return false;
    };

    const navigate = useNavigate();

    const handleNext = () => {
      const stepOneHasErrors = isStepOneHasErrors();
      const stepTwoHasErrors = isStepTwoHasErrors();
      const stepThreeHasErrors = isStepThreeHasErrors();
      const stepFourHasErrors = isStepFourHasErrors();
      if (activeStep === 0 && stepOneHasErrors) {
        toast.error("Please Fill manadatory Fields");
        setActiveStep(0);
        return;
      }
      if (activeStep === 1 && stepTwoHasErrors) {
        toast.error("Please Fill manadatory Fields");
        setActiveStep(1);
        return;
      }
      if (activeStep === 2 && stepThreeHasErrors) {
        toast.error("Please Fill manadatory Fields");
        setActiveStep(2);
        return;
      }
      if (activeStep === 3 && stepFourHasErrors) {
        toast.error("Please Fill manadatory Fields");
        setActiveStep(3);
        return;
      }
     
      if (activeStep !== steps.length) {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }

      if (values && activeStep == steps.length - 1) {
        const requestModel: IInstituteRegisterationRequest = {
          name: values?.instituteInfo?.name,
          address: values?.instituteInfo?.address,
          state: values?.instituteInfo?.state,
          district: values?.instituteInfo?.district, 
          contactName: values?.primaryContact?.name,
          email: values?.primaryContact?.email,
          mobile: values?.primaryContact?.mobileNumber,
          coOrdinatorName: values?.alternativeContact?.coordinateName,
          coOrdinatorEmail: values?.alternativeContact?.email,
          coOrdinatorMobile: values?.alternativeContact?.mobileNumber,
          coCurriculum: "",
          code: "",
          password: values?.credentials?.passWord,
          program: CommonConstants.Constants.Program,
          studentCount: 0,
          type: "",
          userName: values?.credentials?.userName,
        };
        SetRegistrationProgress(true);
        InstituteRegisterService.Register(requestModel)
          .then((res: IHTTPResponse<IAPIResponse<number>>) => {
            if (res?.data?.data > 0) {
              toast.success(
                "Registration is Success, Please login with UserName and Password"
              );

              navigate(CommonConstants.Routes.Login);
            } else if (res?.data?.errors.length > 0) {
              let errorMessage = "";
              res?.data?.errors.forEach((i) => {
                if (errorMessage !== "") {
                  errorMessage += "\n";
                }
                errorMessage += i.field + " : " + i.message;
              });
              toast.error(errorMessage);
            }
          })
          .catch(() => {
            toast.error(
              "There is an error in registring institution, Please try again"
            );
          })
          .finally(() => {
            SetRegistrationProgress(false);
          });
      }
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleCancel = () => {
      navigate(CommonConstants.Routes.Login);
    };
    const controlState: InstituteRegistrationControlState =
      getControlState(values);
    const validationSchema = getValidationSchema(values);


    const steps = [
      "Basic Information",
      "Contact Details",
      "Coordinator Details",
      "Credentials",
    ];

    return (
      <>
        <Paper variant="outlined" sx={{ padding: "24px" }}>
          <Typography component="h1" variant="h4" align="center">
            Institution Registration
          </Typography>
          <Stepper activeStep={activeStep} sx={{ padding: "24px 0px 40px" }}>
            {steps.map((label, index) => {
              return (
                <Step hidden={index > steps.length - 1} key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent></StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === 0 && (
            <Grid
              container
              spacing={3}
              sx={{
                "& .MuiGrid-item": { paddingTop: 1 },
              }}
            >
              <Grid item xs={12}>
                <TextField
                  sx={{ m: 1 }}
                  id="outlined-required"
                  label={controlState.instituteInfo.label.name}
                  disabled={controlState.instituteInfo.disable.name}
                  value={values.instituteInfo.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="instituteInfo.name"
                  error={!!errors.instituteInfo?.name}
                  helperText={errors.instituteInfo?.name}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={2}
                  sx={{ m: 1 }}
                  fullWidth={true}
                  name="instituteInfo.address"
                  value={values.instituteInfo.address}
                  error={!!errors.instituteInfo?.address}
                  helperText={errors.instituteInfo?.address}
                  label={controlState.instituteInfo.label.address}
                  disabled={controlState.instituteInfo.disable.address}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={states}
                  value={states.find((i) => i.id === values.instituteInfo.state)}
                  sx={{
                    m: 1,
                    width: "100%",
                    display: "inline-block",
                  }}
                  onChange={(event: any, newValue: any) => {
                    handleChange({
                      target: {
                        name: "instituteInfo.state",
                        value: newValue.id || "",
                      },
                    });
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      name="instituteInfo.state"
                      error={!!errors.instituteInfo?.state}
                      helperText={errors.instituteInfo?.state}
                      label={controlState.instituteInfo.label.state}
                      disabled={controlState.instituteInfo.disable.state}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={districts}
                  value={districtValue}
                  sx={{
                    m: 1,
                    width: "100%",
                    display: "inline-block",
                  }}
                  getOptionLabel={(option) => option.label}
                  inputValue={districtValue?.label || ""}
                  onChange={(event: any, newValue: any) => {
                    handleChange({
                      target: {
                        name: "instituteInfo.district",
                        value: newValue.id || "",
                      },
                    });
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      name="instituteInfo.district"
                      error={!!errors.instituteInfo?.district}
                      helperText={errors.instituteInfo?.district}
                      label={controlState.instituteInfo.label.district}
                      disabled={controlState.instituteInfo.disable.district}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  )}
                />
              </Grid>
              <div></div>
            </Grid>
          )}

          {activeStep === 1 && (
            <Grid
              container
              spacing={3}
              sx={{
                "& .MuiGrid-item": { paddingTop: 1 },
              }}
            >
              <Grid item xs={12}>
                <TextField
                  sx={{ m: 1 }}
                  id="outlined-required"
                  label={controlState.primaryContact.label.name}
                  disabled={controlState.primaryContact.disable.name}
                  onBlur={handleBlur}
                  value={values.primaryContact.name}
                  onChange={handleChange}
                  name="primaryContact.name"
                  error={!!errors.primaryContact?.name}
                  helperText={errors.primaryContact?.name}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ m: 1 }}
                  style={{ width: "100%" }}
                  id="outlined-required"
                  label={controlState.primaryContact.label.email}
                  disabled={controlState.primaryContact.disable.email}
                  onBlur={handleBlur}
                  value={values.primaryContact.email}
                  onChange={handleChange}
                  name="primaryContact.email"
                  error={!!errors.primaryContact?.email}
                  helperText={errors.primaryContact?.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ m: 1 }}
                  style={{ width: "100%" }}
                  id="outlined-required"
                  label={controlState.primaryContact.label.mobileNumber}
                  disabled={controlState.primaryContact.disable.mobileNumber}
                  onBlur={handleBlur}
                  value={values.primaryContact.mobileNumber}
                  onChange={handleChange}
                  name="primaryContact.mobileNumber"
                  error={!!errors.primaryContact?.mobileNumber}
                  helperText={errors.primaryContact?.mobileNumber}
                />
              </Grid>
            </Grid>
          )}
          {activeStep === 2 && (
            <Grid
              container
              spacing={3}
              sx={{
                "& .MuiGrid-item": { paddingTop: 1 },
              }}
            >
              <Grid item xs={12}>
                <TextField
                  sx={{ m: 1 }}
                  required
                  id="outlined-required"
                  label={controlState.alternativeContact.label.coordinateName}
                  disabled={
                    controlState.alternativeContact.disable.coordinateName
                  }
                  onBlur={handleBlur}
                  value={values.alternativeContact.coordinateName}
                  onChange={handleChange}
                  name="alternativeContact.coordinateName"
                  error={!!errors.alternativeContact?.coordinateName}
                  helperText={errors.alternativeContact?.coordinateName}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ m: 1 }}
                  style={{ width: "100%" }}
                  required
                  id="outlined-required"
                  label={controlState.alternativeContact.label.email}
                  disabled={controlState.alternativeContact.disable.email}
                  onBlur={handleBlur}
                  value={values.alternativeContact.email}
                  onChange={handleChange}
                  name="alternativeContact.email"
                  error={!!errors.alternativeContact?.email}
                  helperText={errors.alternativeContact?.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ m: 1 }}
                  style={{ width: "100%" }}
                  required
                  id="outlined-required"
                  label={controlState.alternativeContact.label.mobileNumber}
                  disabled={controlState.alternativeContact.disable.mobileNumber}
                  onBlur={handleBlur}
                  value={values.alternativeContact.mobileNumber}
                  onChange={handleChange}
                  name="alternativeContact.mobileNumber"
                  error={!!errors.alternativeContact?.mobileNumber}
                  helperText={errors.alternativeContact?.mobileNumber}
                />
              </Grid>
            </Grid>
          )}
          {activeStep === 3 && (
            <Grid
              container
              spacing={3}
              sx={{
                "& .MuiGrid-item": { paddingTop: 1 },
              }}
            >
              <Grid item xs={12}>
                <TextField
                  sx={{ m: 1 }}
                  required
                  id="outlined-required"
                  label={controlState.credentials.label.userName}
                  disabled={controlState.credentials.disable.userName}
                  onBlur={handleBlur}
                  value={values.credentials.userName}
                  onChange={handleChange}
                  name="credentials.userName"
                  error={!!errors.credentials?.userName}
                  helperText={errors.credentials?.userName}
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type={"password"}
                  sx={{ m: 1 }}
                  style={{ width: "100%" }}
                  required
                  id="outlined-required"
                  label={controlState.credentials.label.passWord}
                  disabled={controlState.credentials.disable.passWord}
                  onBlur={handleBlur}
                  value={values.credentials.passWord}
                  onChange={handleChange}
                  name="credentials.passWord"
                  error={!!errors.credentials?.passWord}
                  helperText={errors.credentials?.passWord}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type={"password"}
                  sx={{ m: 1 }}
                  style={{ width: "100%" }}
                  required
                  id="outlined-required"
                  label={controlState.credentials.label.confirmPassWord}
                  disabled={controlState.credentials.disable.confirmPassWord}
                  onBlur={handleBlur}
                  value={values.credentials.confirmPassWord}
                  onChange={handleChange}
                  name="credentials.confirmPassWord"
                  error={!!errors.credentials?.confirmPassWord}
                  helperText={errors.credentials?.confirmPassWord}
                />
              </Grid>
            </Grid>
          )}

          <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" onClick={handleCancel} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <LoadingButton
                disabled={!dirty}
                variant="contained"
                onClick={handleNext}
                color="primary"
                loading={isRegistrationProgress}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </LoadingButton>
            </Box>
          </React.Fragment>
        </Paper>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
      </>
    );
  };
