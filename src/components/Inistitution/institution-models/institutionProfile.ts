import { IOmrBatchDetails } from "../../common/models/omrModels";

export interface IInstitutionProfile {
  userName: string;
  name: string;
  address: string;
  city: string;
  state: string;
  contactName: string;
  contactNumber1: string;
  contactNumber2: string;
  contactEmail: string;
}

export interface IInstitutionSession {
  profile: IInstitutionProfile;
  batchDetails: IOmrBatchDetails[];
}
