import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  IHTTPErrorResponse,
  IHTTPRequestOptions,
  IHTTPResponse,
  IHTTPOptions,
} from '../models/httpModels';

function extendSessionExpiry(cookieKey: string, expireIsoTime: string): void {
  const cookieValue = `${cookieKey}=${expireIsoTime}`;
  document.cookie = cookieValue;
}

const onSuccess = (response: AxiosResponse, cvrHttpOptions?: IHTTPOptions): IHTTPResponse => {

  return response;
};

const onError = (error: any, cvrHttpOptions?: IHTTPOptions): Promise<never> => {

  return Promise.reject(error);
};

export class HTTPService {
  private httpOptions?: IHTTPOptions;

  constructor(options?: IHTTPOptions) {
    this.httpOptions = options;
  }

  get = async (url: string, options?: IHTTPRequestOptions): Promise<IHTTPResponse> => {
    const encodedURL = encodeURI(url);
    try {
      const response = await axios.get(encodedURL, { withCredentials: true, ...options });
      return onSuccess(response, this.httpOptions);
    } catch (error) {
      return onError(error, this.httpOptions);
    }
  };

  post = async (
    url: string,
    data?: unknown,
    options?: IHTTPRequestOptions,
  ): Promise<IHTTPResponse> => {
    const encodedURL = encodeURI(url);
    try {
      const response = await axios.post(encodedURL, data, { withCredentials: true, ...options });
      return onSuccess(response, this.httpOptions);
    } catch (error) {
      return onError(error, this.httpOptions);
    }
  };

  fileUpload = async (
    url: string,
    data?: FormData,
    options?: IHTTPRequestOptions,
  ): Promise<IHTTPResponse> => {
    const encodedURL = encodeURI(url);
    try {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      const response = await axios.post(encodedURL, data, { withCredentials: true, headers, ...options });
      return onSuccess(response, this.httpOptions);
    } catch (error) {
      return onError(error, this.httpOptions);
    }
  };

  put = async (
    url: string,
    data?: unknown,
    options?: IHTTPRequestOptions,
  ): Promise<IHTTPResponse> => {
    const encodedURL = encodeURI(url);
    try {
      const response = await axios.put(encodedURL, data, { withCredentials: true, ...options });
      return onSuccess(response, this.httpOptions);
    } catch (error) {
      return onError(error, this.httpOptions);
    }
  };

  patch = async (
    url: string,
    data?: unknown,
    options?: IHTTPRequestOptions,
  ): Promise<IHTTPResponse> => {
    const encodedURL = encodeURI(url);
    try {
      const response = await axios.patch(encodedURL, data, { withCredentials: true, ...options });
      return onSuccess(response, this.httpOptions);
    } catch (error) {
      return onError(error, this.httpOptions);
    }
  };

  delete = async (url: string, options?: IHTTPRequestOptions): Promise<IHTTPResponse> => {
    const encodedURL = encodeURI(url);
    try {
      const response = await axios.delete(encodedURL, { withCredentials: true, ...options });
      return onSuccess(response, this.httpOptions);
    } catch (error) {
      return onError(error, this.httpOptions);
    }
  };
}
