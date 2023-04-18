import * as React from "react";
import axios from 'axios';

const client = axios.create({
    withCredentials: true
});

const HttpWrapperService = function (options: any) {
    const onSuccess = function (response: any) {
        return response.data;
    }
    const onError = function (error: any) {
        return error;
    }
    return client(options)
        .then(onSuccess)
        .catch(onError);
}

export default HttpWrapperService;