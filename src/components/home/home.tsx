import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  useNavigate,
} from "react-router-dom";
import { InistitutionHome } from "../Inistitution/institute-home/inistituteHome";
import { InistitutionRegistration } from "../Inistitution/institute-registration/instituteRegistration";
import { InistitutionProfile } from "../Inistitution/institute-profile/instituteProfile";
import { InstituteLogin } from "../login/instituteLogin";
import { TokenUserHelper } from "../common/services/token-user-service";

export const Home: FunctionComponent = () => {
  let navigate = useNavigate();
  const tokenUser = TokenUserHelper.Get();
  if (tokenUser === undefined) {
    navigate("/user/login");
  } else
  if (tokenUser.UserType === "Institution") {
    navigate("/institute/Home");
  } 
  return <></>;
};
