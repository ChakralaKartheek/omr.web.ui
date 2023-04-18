import { type } from "os";
import {
    ControlState,
    IControlState,
} from "../common/ui-form/control-state";


export interface IInstituteLoginInfo {
    userName: string;
    passWord: string;
}

export interface IInstituteLoginControlState {
    userName: IControlState;
    passWord: IControlState;
}

export class InstituteLoginControlState
    implements IInstituteLoginControlState {
    userName: IControlState = new ControlState();
    passWord: IControlState = new ControlState();
}