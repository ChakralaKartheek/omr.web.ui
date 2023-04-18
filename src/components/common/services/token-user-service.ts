import { ITokenUser } from "../models/token-user";
import CookieHelper from "./cookieHelper";
import jwt_decode from "jwt-decode";
import { CommonConstants } from "../constants/common-constants";

const key = CommonConstants.UserTokenKey;
const Save = (token: string): void => {
  CookieHelper.save(key, token);
};

const Get = (): ITokenUser => {
  let tokenUser: ITokenUser;
  try {
    const value: string = CookieHelper.get(key);
    tokenUser = jwt_decode(value);
    return tokenUser;
  } catch {
    return {} as ITokenUser;
  }
};

const Delete = (): void => {
  CookieHelper.remove(key);
};

export const TokenUserHelper = {
  Save,
  Get,
  Delete,
};
