import * as React from "react";
import { CommonConstants } from "../../common/constants/common-constants";
import { IApiResultModel } from "../../common/interfaces/api-data-model.interface";
import { HTTPService } from "../../common/services/httpService";
import { IInstituteRegisterationRequest } from "../institute-registration/instituteRegistrationModels";

const httpService = new HTTPService();
const instituteProfile = (authtoken: string): Promise<any> => {
  //const url = `${CommonConstants.BaseAddress}${CommonConstants.ApiConstants.InstituteProfile}`;
  // const url = "http://localhost:52163/WebApi/Institution/Profile"; //window.location.protocol + "//" + window.location.host + "//WebApi//Institution/Profile"
  const url = `${CommonConstants.BaseAddress}${"/Institution/Profile"}`;
  return httpService.get(url, { headers: { token: authtoken } });
};

const InstituteProfileService = {
  instituteProfile,
};

export default InstituteProfileService;
