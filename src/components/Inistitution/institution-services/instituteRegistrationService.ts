import * as React from "react";
import HttpWrapperService from "./httpWrapperService";
import { CommonConstants } from "../../common/constants/common-constants";
import { IInstituteRegisterationRequest } from "../institute-registration/instituteRegistrationModels";
import { HTTPService } from "../../common/services/httpService";
import { IAPIResponse, IHTTPResponse } from "../../common/models/httpModels";

const httpService = new HTTPService();

const Register = (request: IInstituteRegisterationRequest): Promise<IHTTPResponse<IAPIResponse<number>>> => {
    const url = `${(CommonConstants.BaseAddress)}${CommonConstants.ApiConstants.Register}`;
    return httpService.post(url,request);
};

const InstituteRegisterService = {
    Register
};

export default InstituteRegisterService;