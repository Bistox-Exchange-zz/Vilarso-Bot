import axios, {AxiosRequestConfig} from 'axios';
import {injectable} from 'inversify';
import {sign} from '../common/common';

export interface IHttpClient {
    executeBistox<T = any>(requestData: IHttpRequest<T>): Promise<T>;

    executeBetprotocol<T = any>(requestData: IHttpRequest<T>): Promise<T>;
}

@injectable()
export class HttpClientService implements IHttpClient {
    constructor() {
    }

    public executeBistox<T = any>(requestData: IHttpRequest<T>): Promise<T> {
        return new Promise(async (resolve, reject) => {
            const requestConfig: AxiosRequestConfig = {
                url: requestData.url,
                method: requestData.method,
                data: requestData.body,
            };

            // attach default header
            const headers: any = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };

            if (requestData.token) {
                headers['Authorization'] = requestData.token;
                headers['authorization'] = requestData.token;
                requestConfig.headers = headers;
            }

            console.log('bistox request:', requestData);

            await axios(requestConfig)
                .then((response) => {
                    console.log('bistox response status', response.status);
                    console.log('bistox response data', response.data);
                    if (response.status !== 200) {
                        reject({
                            status: response.status,
                            data: response.data,
                        });
                    } else {
                        resolve(response.data);
                    }
                })
                .catch((e) => {
                    console.error('Invalid bistox response', e);
                    reject({
                        status: 500,
                        data: null,
                    });
                });
        });
    }

    executeBetprotocol<T = any>(requestData: IHttpRequest<T>): Promise<T> {
        return new Promise(async (resolve, reject) => {
            const signature = sign(requestData.body);
            const headers: any = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-sha2-signature': signature,
            };
            const requestConfig: AxiosRequestConfig = {
                url: requestData.url,
                method: requestData.method,
                data: requestData.body,
                headers,
            };
            console.log('Betprotocol request', requestConfig);
            await axios(requestConfig)
                .then((response) => {
                    console.log('Betprotocol response status', response.status);
                    console.log('Betprotocol response data', response.data);
                    if (response.status !== 200) {
                        reject({
                            status: response.status,
                            data: response.data,
                        });
                    }
                    resolve(response.data);
                })
                .catch((e) => {
                    console.log(e);
                    reject({
                        status: 500,
                        data: null,
                    });
                });
        });
    }
}

export interface IHttpRequest<T = any> {
    method: 'POST' | 'GET';
    url: string;
    token?: string;
    body?: T | any;
}

// tslint:disable-next-line:interface-name
export interface BistoxRequest {
    payload: BistoxWithdrawalRequest | BistoxGenerateAddressRequest;
}

// tslint:disable-next-line:interface-name
export interface BistoxResponse {
    errors?: any;
    value?: any;
}

// tslint:disable-next-line:interface-name
interface BistoxWithdrawalRequest {
    app: string;
    to: string;
    user: string;
    currency: string;
    amount: string;
    baseObjectId: string;
}

// tslint:disable-next-line:interface-name
interface BistoxGenerateAddressRequest {
    customerId: string;
    currencyType: string;
}
