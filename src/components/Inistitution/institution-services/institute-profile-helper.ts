import { SessionStorageHelper } from '../../common/services/session-storage-helper';
import { IInstitutionProfile } from '../institution-models/institutionProfile';
const USER_PROFILE_KEY = 'institute-profile';
const Save = (state: string, model: IInstitutionProfile): void => {
  SessionStorageHelper.SetItem(state, USER_PROFILE_KEY, model);
};

const Get = (state: string): IInstitutionProfile => {
  const value: IInstitutionProfile = SessionStorageHelper.GetItem(state, USER_PROFILE_KEY);
  return value;
};

const Delete = (state: string): void => { SessionStorageHelper.RemoveItem(state, USER_PROFILE_KEY); };

export const InstituteProfileHelper = {
  Save,
  Get,
  Delete
};