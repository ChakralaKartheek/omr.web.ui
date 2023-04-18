import { type } from "os";
import { Validator } from "react";
import { IAutoCompleteOption } from "../../common/models/formModels";
import {
  ControlState,
  IControlState,
} from "../../common/ui-form/control-state";
export interface IInstituteRegistrationInfo {
  name: string;
  address: string;
  district: string;
  state: string;
}
export interface IInstituteRegistrationFormProps {
    instituteInfo: IInstituteRegistrationInfo;
    primaryContact: IInstituteContact;
    alternativeContact: IInstituteAlternativeContact;
    credentials: IInstituteCredentials;
}

export interface IInstituteContact {
  name: string;
  email: string;
  mobileNumber: string;
}

export interface IInstituteAlternativeContact {
    coordinateName: string;
    email: string;
    mobileNumber: string;
}

export interface IInstituteCredentials {
    userName: string;
    passWord: string;
    confirmPassWord: string;
}


export interface IInstituteRegistrationControlState {
    instituteInfo: IControlState;
    primaryContact: IControlState;
    alternativeContact: IControlState;
    credentials: IControlState;
}
export class InstituteRegistrationControlState
    implements IInstituteRegistrationControlState {
    instituteInfo: IControlState = new ControlState();
    primaryContact: IControlState = new ControlState();
    alternativeContact: IControlState = new ControlState();
    credentials: IControlState = new ControlState();
}

export interface IFormControlStatus {
  hidden: boolean;
  label: string;
  disable: boolean;
}

export class FormControlStatus implements IFormControlStatus {
  hidden: boolean = false;
  label: string = "";
  disable: boolean = false;
}


export interface IInstituteRegisterationRequest {
    name: string;
    type: string;
   
    address: string;
    state: string;
    district: string;
    contactName: string;
    email: string;
    mobile: string;
    coOrdinatorName: string;
    coOrdinatorEmail: string;
    coOrdinatorMobile: string;
    code: string;
    studentCount: number;
    coCurriculum: string;
    program: string;
    userName: string;
    password: string;
}

// type FormStatus<T> = {
//   [K in keyof T]?: null extends T[K]
//       ? Validator<T[K] | null | undefined>
//       : undefined extends T[K]
//       ? Validator<T[K] | null | undefined>
//       : Validator<T[K]>
// };
