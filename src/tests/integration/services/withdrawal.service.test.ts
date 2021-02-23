// import BigNumber from 'bignumber.js';
// import * as expect from 'expect';
// import {IWithdrawalRequest, WithdrawalRequest} from '../../../../sequelizeModels/WithdrawalRequest';
// import {BISTOX_CREATE_WITHDRAWAL_URL} from '../../../config';
// import {iocContainer} from '../../../ioc/ioc.config';
// import {TYPES} from '../../../resources/types';
// import {WithdrawalRequestResource} from '../../../resources/withdrawal.request.resource';
// import {IHttpClient} from '../../../services/httpClient.service';
// import {TYPES as serviceTypes} from '../../../services/types';
// import {IWithdrawalService, IWithdrawRequest} from '../../../services/withdrawal.service';
// import {HttpClientMock} from '../../mock/services/HttpClientMock';
// import {createDefaultUpdateWithdrawalRequest} from './testHelper';
//
// describe('withdrawalService', () => {
//     const repository = iocContainer.get<WithdrawalRequestResource>(TYPES.WithdrawalRequestSequelizeResource);
//     describe('Create withdrawal request', () => {
//         let service: IWithdrawalService;
//         let httpMock: HttpClientMock;
//         it('should create new withdrawalRequest and return response', (done) => {
//             httpMock = iocContainer.get<HttpClientMock>(serviceTypes.HttpClientService);
//             service = iocContainer.get<IWithdrawalService>(serviceTypes.WithdrawalService);
//
//             httpMock.addResponse(BISTOX_CREATE_WITHDRAWAL_URL, {value: true});
//             const payload = createDefaultWithdrawRequest();
//
//             service.withdraw(payload)
//                 .then(async (response: any) => {
//                     const expectedWithdrawalRequest = await repository.Repository
//                         .findOne({where: {nonce: payload.nonce.toNumber()}});
//                     expect(expectedWithdrawalRequest).not.toBeNull();
//                     expect(expectedWithdrawalRequest.address).toBe(payload.sendTo);
//                     expect(expectedWithdrawalRequest.app).toBe(payload.app);
//                     expect(expectedWithdrawalRequest.autoWithdraw).toBe(payload.isAutoWithdraw);
//                     expect(expectedWithdrawalRequest.creation_timestamp).toBeDefined();
//                     expect(expectedWithdrawalRequest.last_update_timestamp).toBeDefined();
//                     expect(expectedWithdrawalRequest.currency_ticker).toBe(payload.ticker);
//                     expect(expectedWithdrawalRequest.transactionHash).toBeNull();
//                     expect(expectedWithdrawalRequest.amount).toEqual(payload.amount);
//                     expect(expectedWithdrawalRequest.confirmed).toEqual(0);
//                     expect(expectedWithdrawalRequest.done).toEqual(0);
//                     expect(expectedWithdrawalRequest.status).toBe('Pending');
//                     expect(expectedWithdrawalRequest.isAffiliate).toEqual(payload.isAffiliate ? 1 : 0);
//                     expect(expectedWithdrawalRequest.link_url).toBeNull();
//                     expect(expectedWithdrawalRequest.withdrawNotification).toBe(payload.withdrawNotification);
//                     expect(expectedWithdrawalRequest.note).toBeNull();
//                     expect(expectedWithdrawalRequest.fee).toEqual(payload.fee);
//                     expect(expectedWithdrawalRequest.nonce).toEqual(payload.nonce.toNumber());
//
//                     expect(response).not.toBeNull();
//                     expect(response.autoWithdraw).toBe(expectedWithdrawalRequest.autoWithdraw);
//                     expect(response.request_id).toBe(expectedWithdrawalRequest.id);
//                     expect(response.tx).toBeNull();
//
//                     done();
//                 })
//                 .catch(done);
//         });
//         it('should rollback transaction if bistoxResponse with error', (done) => {
//             httpMock = iocContainer.get<HttpClientMock>(serviceTypes.HttpClientService);
//             service = iocContainer.get<IWithdrawalService>(serviceTypes.WithdrawalService);
//
//             httpMock.addResponse(BISTOX_CREATE_WITHDRAWAL_URL, {errors: []});
//             const payload = createDefaultWithdrawRequest();
//
//             service.withdraw(payload)
//                 .then(async (response: any) => done())
//                 .catch((e) => {
//                     expect(e.code).toBe(5001);
//                     expect(e.message).toBe('Cannot execute');
//                     done();
//                 });
//         });
//         it('should return existing request');
//     });
//
//     describe('Update withdrawal request', () => {
//         const withdrawRequest: IWithdrawRequest = createDefaultWithdrawRequest();
//         const payload: IWithdrawalRequest = {
//             address: withdrawRequest.sendTo,
//             nonce: withdrawRequest.nonce.toNumber(),
//             app: withdrawRequest.app,
//             autoWithdraw: withdrawRequest.isAutoWithdraw,
//             currency_ticker: withdrawRequest.ticker,
//             amount: withdrawRequest.amount,
//             user: withdrawRequest.user,
//             creation_timestamp: '', // TODO: Fill with format
//             last_update_timestamp: '', // TODO: Fill with format
//             confirmed: 0,
//             done: 0,
//             isAffiliate: withdrawRequest.isAffiliate ? 1 : 0,
//             withdrawNotification: withdrawRequest.withdrawNotification,
//             fee: withdrawRequest.fee,
//         };
//         const service: IWithdrawalService = iocContainer.get<IWithdrawalService>(serviceTypes.WithdrawalService);
//         let requestId: string;
//         it('should update withdrawal', (done) => {
//             const servicePayload = createDefaultUpdateWithdrawalRequest(
//                 requestId,
//                 '123',
//                 'pending');
//
//             service.updateWithdraw(servicePayload)
//                 .then(async (response: any) => {
//                     const expectedWithdrawalRequest = await repository.Repository.findOne({where: {id: servicePayload.requestId}});
//                     expect(expectedWithdrawalRequest).not.toBeNull();
//                     expect(expectedWithdrawalRequest.transactionHash).toBe(servicePayload.transactionHash);
//                     expect(expectedWithdrawalRequest.confirmed).toEqual(0);
//                     expect(expectedWithdrawalRequest.done).toEqual(0);
//                     expect(expectedWithdrawalRequest.status).toBe('Pending');
//                     done();
//                 })
//                 .catch(done);
//         });
//         it('should update withdrawal status: "completed"', (done) => {
//             const servicePayload = createDefaultUpdateWithdrawalRequest(
//                 requestId,
//                 '123',
//                 'completed');
//
//             service.updateWithdraw(servicePayload)
//                 .then(async (response: any) => {
//                     const expectedWithdrawalRequest = await repository.Repository.findOne({where: {id: servicePayload.requestId}});
//                     expect(expectedWithdrawalRequest).not.toBeNull();
//                     expect(expectedWithdrawalRequest.transactionHash).toBe(servicePayload.transactionHash);
//                     expect(expectedWithdrawalRequest.confirmed).toEqual(1);
//                     expect(expectedWithdrawalRequest.done).toEqual(1);
//                     expect(expectedWithdrawalRequest.status).toBe('Finalized');
//                     done();
//                 })
//                 .catch(done);
//         });
//         it('should update withdrawal status: "failed"', (done) => {
//             const servicePayload = createDefaultUpdateWithdrawalRequest(
//                 requestId,
//                 '123',
//                 'failed');
//
//             service.updateWithdraw(servicePayload)
//                 .then(async (response: any) => {
//                     const expectedWithdrawalRequest = await repository.Repository.findOne({where: {id: servicePayload.requestId}});
//                     expect(expectedWithdrawalRequest).not.toBeNull();
//                     expect(expectedWithdrawalRequest.transactionHash).toBe(servicePayload.transactionHash);
//                     expect(expectedWithdrawalRequest.confirmed).toEqual(0);
//                     expect(expectedWithdrawalRequest.done).toEqual(1);
//                     expect(expectedWithdrawalRequest.status).toBe('Canceled');
//                     done();
//                 })
//                 .catch(done);
//         });
//     });
// });
//
// function createDefaultWithdrawRequest(sendTo: string = '0x927Be3f53758AA0Cc983c4C0F9Aec28C0E907a7F',
//                                       isAutoWithdraw: boolean = true,
//                                       ticker: 'eth' | 'ETH' | 'bsx' | 'BSX' | 'btc' | 'BTC' = 'eth',
//                                       isAffiliate: boolean = false,
//                                       app: string = 'app_name',
//                                       user: string = 'user_Id',
//                                       amount: number = 0.01,
//                                       nonce: number = 100001,
//                                       withdrawNotification: string = 'some text',
//                                       fee: number = 0.000001) {
//     const result: IWithdrawRequest = {
//         sendTo,
//         isAutoWithdraw,
//         ticker,
//         isAffiliate,
//         app,
//         user,
//         amount: new BigNumber(amount),
//         nonce: new BigNumber(nonce),
//         withdrawNotification,
//         fee: new BigNumber(fee),
//     };
//
//     return result;
// }
