import * as React from "react";

export interface IApiResultModel<T> extends IBaseApiResultModel {
    list: [],
    data: T
}

export interface IBaseApiResultModel {
    errors: IApiErrorModel[],
    messages:string[]

}

export interface IApiErrorModel {
    message: string;
    field?: string;
}