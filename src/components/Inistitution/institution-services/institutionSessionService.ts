import { CommonConstants } from "../../common/constants/common-constants";
import { IOmrBatchDetails } from "../../common/models/omrModels";
import { SessionStorageHelper } from "../../common/services/session-storage-helper";
import {
  IInstitutionProfile,
  IInstitutionSession,
} from "../institution-models/institutionProfile";

const updateBatchDetails = (data: IOmrBatchDetails[]) => {
  SessionStorageHelper.SetItem(CommonConstants.SessionKey.batchDetails, data);
};
const updateUserDetails = (data: IInstitutionProfile) => {
  SessionStorageHelper.SetItem(
    CommonConstants.SessionKey.instituteProfile,
    data
  );
};
const deleteUserDetails = () => {
  SessionStorageHelper.RemoveItem(CommonConstants.SessionKey.instituteProfile);
};
const deleteBatchDetails = () => {
  SessionStorageHelper.RemoveItem(CommonConstants.SessionKey.batchDetails);
};

const getBatchDetails = (): IOmrBatchDetails[] => {
  return SessionStorageHelper.GetItem(CommonConstants.SessionKey.batchDetails);
};
const getUserDetails = (): IInstitutionProfile => {
  return SessionStorageHelper.GetItem(
    CommonConstants.SessionKey.instituteProfile
  );
};
const isUserDetailsExist = (): boolean => {
  return getUserDetails() === null ? false : true;
};

const isBatchDetailsExist = (): boolean => {
  return getBatchDetails() === null ? false : true;
};

const isInstitutionSessionExist = (): boolean => {
  return isUserDetailsExist() && isBatchDetailsExist();
};

const clearSession = () => {};

const InstitutionSessionService = {
  updateBatchDetails,
  updateUserDetails,
  getBatchDetails,
  getUserDetails,
  clearSession,
  deleteUserDetails,
  deleteBatchDetails,
  isUserDetailsExist,
  isBatchDetailsExist,
  isInstitutionSessionExist,
};

export default InstitutionSessionService;
