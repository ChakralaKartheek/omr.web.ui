import { LoginFieldSet } from "../login/loginFieldSet";
import { Container, Paper} from "@mui/material";
import React, { FunctionComponent } from "react";
import { IInstituteLoginInfo } from "./instituteLoginModels";
import { FormType, withForm } from "../common/ui-form";
import { getInistitutionLoginFormValidations } from "./instituteLoginValidations";
import { getInstitueLoginControlState } from "./instituteLoginControlState";
import { CommonConstants } from "../common/constants/common-constants";
const InistitutionLoginForm = withForm<
    IInstituteLoginInfo,
    FormType<IInstituteLoginInfo>
>(LoginFieldSet);

export const InstituteLogin: FunctionComponent = () => {
    const intialValues = (): IInstituteLoginInfo => {
        return {
            userName: "",
            passWord: "",
        };
    };

    return (
        <>
            <Container sx={{}}>
                <Paper variant="outlined" sx={{ padding: "24px", borderRadius: "0.625rem", mt: '2rem', bgcolor: '#fafafa' }}>
                    <InistitutionLoginForm
                        enableReintialize
                        formValues={intialValues()}
                        getValidationSchema={(v: IInstituteLoginInfo) =>
                            getInistitutionLoginFormValidations(v)
                        }
                        getControlState={(v: IInstituteLoginInfo) =>
                            getInstitueLoginControlState(v)
                        }
                    />
                </Paper>
            </Container>
        </>
    );
};