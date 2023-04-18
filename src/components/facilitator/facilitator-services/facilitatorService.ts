import * as React from "react";
import { CommonConstants } from "../../common/constants/common-constants";
import { IListItem } from "../../common/interfaces/list-item";
import { IAPIResponse, IHTTPResponse } from "../../common/models/httpModels";
import { HTTPService } from "../../common/services/httpService";
import { IInstituteLoginInfo } from "../../login/instituteLoginModels";
import { IInstitutionResponse } from "../models/IInstitutionResponse";
import { IStudentListResponse } from "../models/IStudentsListResponse";

const httpService = new HTTPService();
const getInstitutionCount = (): Promise<any> => {
  const url = `${CommonConstants.BaseAddress}${CommonConstants.ApiConstants.InstitutionsCount}`;
  return httpService.get(url);
};

const getStudentsCount = (): Promise<any> => {
  const url = `${CommonConstants.BaseAddress}${CommonConstants.ApiConstants.StudentsCount}`;
  return httpService.get(url);
};

const getInstitutions = (): Promise<IHTTPResponse<IAPIResponse<IInstitutionResponse>>> => {
  const url = `${CommonConstants.BaseAddress}${CommonConstants.ApiConstants.InstitutionsAll}`;
  return httpService.get(url);
};

const getInstitutionsList = (): Promise<IHTTPResponse<IAPIResponse<IListItem>>> => {
  const url = `${CommonConstants.BaseAddress}${CommonConstants.ApiConstants.InstitutionListItem}`;
  return httpService.get(url);
};

const getStudentList = (institutionId : string): Promise<IHTTPResponse<IAPIResponse<IStudentListResponse>>> => {
  const url = `${CommonConstants.BaseAddress}${CommonConstants.ApiConstants.StudentList}?institutionId=`+institutionId;
  return httpService.get(url);
};

const FacilitatorService = {
  getInstitutionCount,
  getStudentsCount,
  getInstitutions,
  getInstitutionsList,
  getStudentList
};

export default FacilitatorService;
