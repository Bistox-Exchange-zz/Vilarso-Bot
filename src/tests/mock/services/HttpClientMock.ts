// import {IHttpClient, IHttpRequest} from '../../../services/httpClient.service';
//
// export class HttpClientMock implements IHttpClient {
//     private readonly responsesByUrl: Map<string, any> = new Map<string, string>();
//
//     constructor() {
//     }
//
//     executeBistox<T = any>(requestData: IHttpRequest<T>): Promise<T> {
//         return new Promise<T>((resolve, reject) => {
//             if (this.responsesByUrl.has(requestData.url)) {
//                 return resolve(this.responsesByUrl.get(requestData.url));
//             }
//             throw new Error(`missing response for "${requestData.url}"`);
//         });
//     }
//
//     addResponse(key: string, value: any): void {
//         this.responsesByUrl.set(key, value);
//     }
//
//     removeResponse(key: string): void {
//         this.responsesByUrl.delete(key);
//     }
//
//     removeAll(): void {
//         this.responsesByUrl.clear();
//     }
//
//     executeBetprotocol<T = any>(requestData: IHttpRequest<T>): Promise<T> {
//         return Promise.resolve(undefined);
//     }
// }
