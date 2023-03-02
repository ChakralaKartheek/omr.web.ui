import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

export const Home: FunctionComponent = () => {
    let navigate = useNavigate();
    // const tokenUser = TokenUserHelper.Get();
    // if (tokenUser === undefined) {
    //   navigate("/user/login");
    // } else
    // if (tokenUser.UserType === "Institution") {
    //   navigate("/institute/Home");
    // } 
    navigate("/institute/Home");
    return <></>;
  };