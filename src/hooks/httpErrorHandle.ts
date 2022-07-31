import { useState, useEffect } from 'react'
import { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";

const useHttpErrorHandler = (httpClient: AxiosInstance) => {
    const initState = null as null | string
    const [errorState, setError] = useState(initState)


    let resInterceptor: number | null = 0;
    let reqInterceptor: number | null = 0;


    useEffect(() => {
        return () => {
            reqInterceptor &&
                httpClient.interceptors.request.eject(reqInterceptor);
            resInterceptor &&
                httpClient.interceptors.response.eject(resInterceptor);
        }

    }, [reqInterceptor, resInterceptor, httpClient.interceptors.request, httpClient.interceptors.response])

    const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
        return config;
    }

    const onRequestError = (error: AxiosError): Promise<AxiosError> => {

        return Promise.reject(error);
    }

    const onResponse = (response: AxiosResponse): AxiosResponse => {

        return response;
    }

    const onResponseError = (error: AxiosError): Promise<AxiosError> => {
        setErrorHandler(error.message)
        return Promise.reject(error);
    }


    reqInterceptor = httpClient.interceptors.request.use(onRequest, onRequestError);
    resInterceptor = httpClient.interceptors.response.use(onResponse, onResponseError);

    function setErrorHandler(message: string) {
        setError(message)
    }

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [errorState, errorConfirmedHandler]
}

export default useHttpErrorHandler
