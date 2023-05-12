import { SessionStorageHelper } from '../../common/services/session-storage-helper';
import { IInstitutionProfile } from '../institution-models/institutionProfile';
const USER_PROFILE_KEY = 'institute-profile';
const Save = (model: IInstitutionProfile): void => {
  SessionStorageHelper.SetItem(USER_PROFILE_KEY, model);
};

const Get = (): IInstitutionProfile => {
  const value: IInstitutionProfile = SessionStorageHelper.GetItem(USER_PROFILE_KEY);
  return value;
};

const Delete = (state: string): void => { SessionStorageHelper.RemoveItem(USER_PROFILE_KEY); };

export const InstituteProfileHelper = {
  Save,
  Get,
  Delete
};