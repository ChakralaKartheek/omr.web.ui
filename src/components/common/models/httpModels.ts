import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IHTTPResponse<T = any> extends Omit<AxiosResponse<T>, 'config'> {
  cvrHttpOptions?: IHTTPOptions;
}

export interface IHTTPErrorResponse
  extends Omit<AxiosError, 'config' | 'isAxiosError' | 'toJSON'> {
  cvrHttpOptions?: IHTTPOptions;
}

export interface IHTTPKeys {
  SessionHeader: string;
  SessionExpiryCookie: string;
}

export interface IHTTPOptions {
  state: string;
}
export interface IErrorResponse {
  field: string;
  message: string;
}
export interface IAPIResponse<T> {
  errors: IErrorResponse[];
  data: T;
  list: T[];
  messages : string[];
}

export type IHTTPRequestOptions = AxiosRequestConfig;