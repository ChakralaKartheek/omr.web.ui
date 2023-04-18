import * as Yup from "yup";
import {
    IInstituteLoginInfo
} from "./instituteLoginModels";


export const getInistitutionLoginFormValidations = (
    values: IInstituteLoginInfo
): Yup.AnyObjectSchema => {
    const schema: Yup.SchemaOf<IInstituteLoginInfo> = Yup.object()
        .shape({
            userName: Yup.string().required("UserName is Required"),
            passWord: Yup.string().required("Password is required").min(6, "Your password must be longer than 6 characters.")
        })
        .defined();
    return schema;
};