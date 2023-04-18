import * as Yup from "yup";
import {
    IInstituteAlternativeContact,
    IInstituteContact,
    IInstituteCredentials,
    IInstituteRegistrationFormProps,
    IInstituteRegistrationInfo
} from "./instituteRegistrationModels";

const phoneRegExp = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
const pwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;

export const getInistitutionRegistrationFormValidations = (
    values: IInstituteRegistrationFormProps
): Yup.AnyObjectSchema => {
    const schema: Yup.SchemaOf<IInstituteRegistrationFormProps> = Yup.object()
        .shape({
            instituteInfo: getInstituteInfoValidations(),
            primaryContact: getContactValidations(),
            alternativeContact: getAlternativeContactValidations(),
            credentials: getCredentialsValidations()
        })
        .defined();
    return schema;
}
const getInstituteInfoValidations = (): Yup.AnyObjectSchema => {
    const schema: Yup.SchemaOf<IInstituteRegistrationInfo> = Yup.object().shape({
        name: Yup.string().required("Inistitution Name is required"),
        state: Yup.string().required("State is required"),
        district: Yup.string().required("District is required"),
        address: Yup.string().required("Address is required"),
    });
    return schema;
};

const getAlternativeContactValidations = (): Yup.AnyObjectSchema => {
    const schema: Yup.SchemaOf<IInstituteAlternativeContact> = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        mobileNumber: Yup.string().matches(phoneRegExp, "Mobile number is not valid")
            .required("Mobile Number is required"),
        coordinateName: Yup.string().required("Coordinate Name is required"),
    });
    return schema;
};


const getContactValidations = (): Yup.AnyObjectSchema => {
    const schema: Yup.SchemaOf<IInstituteContact> = Yup.object().shape({
        email: Yup.string().email().required("Email is required"),
        mobileNumber: Yup.string().matches(phoneRegExp, "Mobile number is not valid")
                    .required("Mobile Number is required"),
        name: Yup.string().required("Contact Name is required"),
    });
    return schema;
};

const getCredentialsValidations = (): Yup.AnyObjectSchema => {
    const schema: Yup.SchemaOf<IInstituteCredentials> = Yup.object().shape({
        userName: Yup.string().required("User Name is required"),
        passWord: Yup.string().required("Password is required").min(6, "Your password must be longer than 6 characters."),
        confirmPassWord: Yup.string().required("Confirm Password is required")
                        .oneOf([Yup.ref('passWord'), null], "Password and Confirm Password are not same."),
    });
    return schema;
};
