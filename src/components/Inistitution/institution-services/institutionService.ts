import { Guid } from "guid-typescript";
import * as React from "react";
import { CommonConstants } from "../../common/constants/common-constants";
import { IAPIResponse, IHTTPResponse } from "../../common/models/httpModels";
import { HTTPService } from "../../common/services/httpService";
import { TokenUserHelper } from "../../common/services/token-user-service";
import { IInstitutionSession } from "../institution-models/institutionProfile";
import { IOmrBatchDetails, IOmrFile } from "../../common/models/omrModels";

const httpService = new HTTPService();

const getStudentInfo = (): Promise<any> => {
  const tokenUser = TokenUserHelper.Get();

  const url = `${CommonConstants.BaseAddress}${CommonConstants.ApiConstants.InstituteGetStudentInfo}?studentId=${tokenUser.UserId}`;

  return httpService.get(url);
};

const validateStudents = (file: File, trailGuid: Guid): Promise<any> => {
  const tokenUser = TokenUserHelper.Get();
  const url = `${CommonConstants.BaseAddress}${CommonConstants.ApiConstants.StudentsUpload}?institutionId=${tokenUser.UserId}&trialGuid=${trailGuid}`;

  const formData = new FormData();
  formData.append("file", file);

  return httpService.fileUpload(url, formData);
};

const saveUploadedStudents = (trailGuid: Guid): Promise<any> => {
  const url = `${CommonConstants.BaseAddress}${CommonConstants.ApiConstants.SaveUploadedStudents}?trialGuid=${trailGuid}`;

  return httpService.get(url);
};
const getOMRCount = (): Promise<IHTTPResponse<any>> => {
  const url = `${CommonConstants.BaseAddress}${CommonConstants.ApiConstants.InstituteStudentCount}`;

  return httpService.get(url);
};

const getBatchList = (
  institutionId: string
): Promise<IHTTPResponse<IOmrBatchDetails[]>> => {
  const url =
    `${CommonConstants.BaseAddress}` +
    `/Institution/${institutionId}/BatchList`;

  return httpService.get(url);
};

const getOmrList = (
  institutionId: string,
  batchId: string
): Promise<IHTTPResponse<IOmrFile[]>> => {
  const url =
    `${CommonConstants.BaseAddress}` +
    `/Institution/${institutionId}/Batch/${batchId}/OMRList`;

  return httpService.get(url);
};

const getSession = (): Promise<IHTTPResponse<IInstitutionSession>> => {
  const url = `${CommonConstants.BaseAddress}${CommonConstants.ApiConstants.InstitutionSession}`;

  return httpService.get(url);
};
const uploadOmrs = (
  institutionId: string,
  batchId: string,
  data: FormData
): Promise<IHTTPResponse<IOmrFile>> => {
  const url =
    `${CommonConstants.BaseAddress}` +
    `/Institution/${institutionId}/batch/${batchId}/Upload`;

  return httpService.fileUpload(url, data);
};
const deleteOmr = (
  institutionId: string,
  omrId: string
): Promise<IHTTPResponse<boolean>> => {
  const url =
    `${CommonConstants.BaseAddress}` +
    `/Institution/${institutionId}/omr/${omrId}/Delete`;

  return httpService.patch(url);
};
const InstitutionService = {
  validateStudents,
  saveUploadedStudents,
  getOMRCount,
  getStudentInfo,
  getBatchList,
  getOmrList,
  getSession,
  uploadOmrs,
  deleteOmr
};

export default InstitutionService;
