// import BigNumber from 'bignumber.js';
// import * as expect from 'expect';
// import {IWithdrawalRequest} from '../../../../sequelizeModels/WithdrawalRequest';
// import {iocContainer} from '../../../ioc/ioc.config';
// import {TYPES as resourceTypes} from '../../../resources/types';
// import {WithdrawalRequestResource} from '../../../resources/withdrawal.request.resource';
// import {TYPES} from '../../../services/types';
// import {IUserService, TransactionRequestPayload} from '../../../services/user.service';
// import {IWithdrawRequest} from '../../../services/withdrawal.service';
//
// describe('userService', () => {
//     const repository = iocContainer.get<WithdrawalRequestResource>(resourceTypes.WithdrawalRequestSequelizeResource);
//     const service = iocContainer.get<IUserService>(TYPES.UserService);
//     describe('transactions', () => {
//         it('should return empty response', (done) => {
//             const payload: TransactionRequestPayload = {
//                 offset: 0,
//                 size: 0,
//                 user: '',
//                 app: 'app',
//             };
//
//             service.transactions(payload)
//                 .then((result) => {
//                     expect(result.withdrawals).toBeDefined();
//                     expect(result.withdrawals.length).toBe(0);
//                     expect(result.deposits).toBeDefined();
//                     expect(result.deposits).toBeNull();
//                     // expect(result.deposits.length).toBe(0); TODO: раскомментить
//                     done();
//                 })
//                 .catch(done);
//         });
//
//         it('should return fill response', (done) => {
//             const bulkPayload: IWithdrawalRequest[] = [];
//             let i;
//             for (i = 0; i < 1; i++) {
//                 const withdrawRequest: IWithdrawRequest = createDefaultWithdrawRequest('user_id', i);
//                 const payload: IWithdrawalRequest = {
//                     address: withdrawRequest.sendTo,
//                     nonce: withdrawRequest.nonce.toNumber(),
//                     app: withdrawRequest.app,
//                     autoWithdraw: withdrawRequest.isAutoWithdraw,
//                     currency_ticker: withdrawRequest.ticker,
//                     amount: withdrawRequest.amount,
//                     user: withdrawRequest.user,
//                     creation_timestamp: '', // TODO: Fill with format
//                     last_update_timestamp: '', // TODO: Fill with format
//                     confirmed: 0,
//                     done: 0,
//                     isAffiliate: withdrawRequest.isAffiliate ? 1 : 0,
//                     withdrawNotification: withdrawRequest.withdrawNotification,
//                     fee: withdrawRequest.fee,
//                 };
//                 bulkPayload.push(payload);
//             }
//             for (i = 0; i < 0; i++) {
//                 const withdrawRequest: IWithdrawRequest = createDefaultWithdrawRequest('user2_id', i);
//                 const payload: IWithdrawalRequest = {
//                     address: withdrawRequest.sendTo,
//                     nonce: withdrawRequest.nonce.toNumber(),
//                     app: withdrawRequest.app,
//                     autoWithdraw: withdrawRequest.isAutoWithdraw,
//                     currency_ticker: withdrawRequest.ticker,
//                     amount: withdrawRequest.amount,
//                     user: withdrawRequest.user,
//                     creation_timestamp: '', // TODO: Fill with format
//                     last_update_timestamp: '', // TODO: Fill with format
//                     confirmed: 0,
//                     done: 0,
//                     isAffiliate: withdrawRequest.isAffiliate ? 1 : 0,
//                     withdrawNotification: withdrawRequest.withdrawNotification,
//                     fee: withdrawRequest.fee,
//                 };
//                 bulkPayload.push(payload);
//             }
//
//             repository.Repository.bulkCreate(bulkPayload)
//                 .then(async () => {
//                     const payload: TransactionRequestPayload = {
//                         offset: 1,
//                         size: 1,
//                         user: 'user_id',
//                         app: 'app',
//                     };
//                     await service.transactions(payload)
//                         .then((result) => {
//                             expect(result.withdrawals).toBeDefined();
//                             expect(result.withdrawals).not.toBeNull();
//                             done();
//                         }).catch(done);
//                 })
//                 .catch(done);
//         });
//     });
// });
//
// function createDefaultWithdrawRequest(user: string = 'user_Id',
//                                       nonce: number = 100001,
//                                       sendTo: string = '0x927Be3f53758AA0Cc983c4C0F9Aec28C0E907a7F',
//                                       isAutoWithdraw: boolean = true,
//                                       ticker: 'eth' | 'ETH' | 'bsx' | 'BSX' | 'btc' | 'BTC' = 'eth',
//                                       isAffiliate: boolean = false,
//                                       app: string = 'app_name',
//                                       amount: number = 0.01,
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
