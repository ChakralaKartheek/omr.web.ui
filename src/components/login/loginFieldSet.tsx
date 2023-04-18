import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  IInstituteLoginInfo,
  InstituteLoginControlState,
} from "./instituteLoginModels";
import { FunctionComponent } from "react";
import { FormType } from "../common/ui-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import LoginService from "../Inistitution/institution-services/loginService";
import { TokenUserHelper } from "../common/services/token-user-service";

function Copyright(props: any) {
  return (
    <></>
    // <Typography
    //   variant="body2"
    //   color="text.secondary"
    //   align="center"
    //   {...props}
    // >
    //   {"Copyright, "} {new Date().getFullYear()} {""}
    //   <Link color="inherit" href="http://www.eabhyasacademy.com">
    //     e-ABHYAS ACADEMY
    //   </Link>
    //   .
    // </Typography>
  );
}

function NeedHelp(props: any) {
  return (
    <> </>
    //  <Typography
    //   variant="body2"
    //   color="text.secondary"
    //   align="center"
    //   {...props}
    // >
    //   {"For Help Contact us "}{""}
    //   <br/>
    //   <br/>
    //   <Link color="inherit" href="mailto:eabhyasacademy@gmail.com">
    // <EmailIcon style={{verticalAlign:'bottom'}} />  eabhyasacademy@gmail.com
    //   </Link>
    //   {"  "}
    //   <Link color="inherit" href="tel:9030779982">
    //  <PhoneIcon  style={{verticalAlign:'bottom'}} /> 9030779982
    //   </Link>
    //   .
    // </Typography> 

  );
}

const theme = createTheme();

export const LoginFieldSet: FunctionComponent<
  FormType<IInstituteLoginInfo>
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
    const navigate = useNavigate();

    const loginSubmit = async (
      loginRequest: IInstituteLoginInfo
    ): Promise<void> => {
      await LoginService.login(loginRequest)
        .then((result) => {
          if(result.status !== 200){
            toast.error(
              `Error occurred while login`
            )
          }
          if (result.data) {
            TokenUserHelper.Save(result.data);
            const tokenUser = TokenUserHelper.Get();
            console.log(tokenUser);
            if (tokenUser === undefined) {
              navigate("/user/login");
            } else if (tokenUser.UserType === "Institution") {
              navigate("/institute/Home");
            }
            else if (tokenUser.UserType === 'Student') {
              navigate('/Student/Home');
            } else if(tokenUser.UserType === 'Facilitator'){
              navigate('/Facilitator/Home');
            }
            // CookieHelper.checkLogOnSession(result.data);
            // let url = `${CommonConstants.Routes.Home}`;
            // navigate(url);
          }
        })
        .catch((error: any) =>
          toast.error(
            `Error occurred while saving registration details - ${error}`
          )
        );
    };

    const handleSubmit = () => {
      // eslint-disable-next-line no-console
      if (isValid) {
        loginSubmit(values);
      }
    };

    const controlState: InstituteLoginControlState = getControlState(values);
    const validationSchema = getValidationSchema(values);

    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "85vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: "url(./trsma-eabhyas-banner.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t: any) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  id="txtUserName"
                  margin="normal"
                  label={controlState.userName.label.userName}
                  disabled={controlState.userName.disable.userName}
                  onBlur={handleBlur}
                  value={values.userName}
                  onChange={handleChange}
                  name="userName"
                  error={!!errors.userName}
                  helperText={errors.userName}
                  fullWidth={true}
                  autoFocus
                />
                <TextField
                  id="txtPassword"
                  margin="normal"
                  label={controlState.passWord.label.passWord}
                  disabled={controlState.passWord.disable.passWord}
                  onBlur={handleBlur}
                  value={values.passWord}
                  onChange={handleChange}
                  name="passWord"
                  error={!!errors.passWord}
                  helperText={errors.passWord}
                  fullWidth={true}
                  type="password"
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!isValid}
                  onClick={handleSubmit}
                >
                  {" "}
                  Sign In
                </Button>
                {/* <Typography variant="body2" color="text.secondary" align="center">
                  <Link href="/#/institute/Registration" variant="body2">
                    {"Institution Registration"}
                  </Link>
                </Typography> */}
                {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/institute/Registration" variant="body2">
                    {"Institution Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
                <Copyright sx={{ mt: 5 }} />
                <NeedHelp sx={{ mt: 5 }} />
                <ToastContainer />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  };
