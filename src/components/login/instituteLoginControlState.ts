import {
    IInstituteLoginInfo,
    IInstituteLoginControlState,
    InstituteLoginControlState,
} from './instituteLoginModels';


export const getInstitueLoginControlState =
    (values: IInstituteLoginInfo): InstituteLoginControlState => {

        let controlState = new InstituteLoginControlState();
        controlState.userName.label.userName = 'User Name';
        controlState.passWord.label.passWord = 'Password';

        return controlState;
    };



