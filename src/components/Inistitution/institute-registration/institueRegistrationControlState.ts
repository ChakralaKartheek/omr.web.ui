import {
  IInstituteRegistrationFormProps,
  IInstituteContact,
  IInstituteRegistrationControlState,
  InstituteRegistrationControlState,
} from './instituteRegistrationModels';


export const getInstitueRegistrationControlState =
    (values: IInstituteRegistrationFormProps): InstituteRegistrationControlState => {

        let controlState = new InstituteRegistrationControlState();
        controlState.instituteInfo.label.name = 'Inistitution Name';
        controlState.instituteInfo.label.address = 'Address';
        controlState.instituteInfo.label.district = 'District';
        controlState.instituteInfo.label.state = 'State';
        controlState.instituteInfo.label.pinCode = 'Pin Code';


        controlState.primaryContact.label.name = 'Contact Name';
        controlState.primaryContact.label.email = 'Email';
        controlState.primaryContact.label.mobileNumber = 'Mobile Number';

        controlState.alternativeContact.label.coordinateName = 'Co-Ordinate Name';
        controlState.alternativeContact.label.email = 'Email';
        controlState.alternativeContact.label.mobileNumber = 'Mobile Number';

        controlState.credentials.label.userName = "User Name";
        controlState.credentials.label.passWord = "Password";
        controlState.credentials.label.confirmPassWord = "Confirm PassWord"

        return controlState;
    };



