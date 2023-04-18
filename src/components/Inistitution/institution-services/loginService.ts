import * as React from "react";
import { CommonConstants } from "../../common/constants/common-constants";
import { IAPIResponse, IHTTPResponse } from "../../common/models/httpModels";
import { HTTPService } from "../../common/services/httpService";
import { IInstituteLoginInfo } from "../../login/instituteLoginModels";

const httpService = new HTTPService();
const login = (request: IInstituteLoginInfo): Promise<IHTTPResponse<any>> => {
  const url = `${CommonConstants.BaseAddress}${
    CommonConstants.ApiConstants.Login
  }`;
  return httpService.post(url,request);
};

const LoginService = {
  login,
};

export default LoginService;
