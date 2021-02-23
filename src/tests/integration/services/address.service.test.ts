// import expect = require('expect');
// import {IAddress} from '../../../../sequelizeModels/Address';
// import {BISTOX_GENERATE_ADDRESS} from '../../../config';
// import {iocContainer} from '../../../ioc/ioc.config';
// import {AddressSequelizeResource} from '../../../resources/address.resource';
// import {TYPES} from '../../../resources/types';
// import {IAddressService, IGetAddressRequest, IGetAddressResponse} from '../../../services/address.service';
// import {IHttpClient} from '../../../services/httpClient.service';
// import {TYPES as serviceTypes} from '../../../services/types';
// import {HttpClientMock} from '../../mock/services/HttpClientMock';
//
// describe('addressService', () => {
//     const repository = iocContainer.get<AddressSequelizeResource>(TYPES.AddressSequelizeResource);
//     describe('getAddress', () => {
//         let service: IAddressService;
//         let httpMock: HttpClientMock;
//
//         beforeEach((done) => {
//             iocContainer.unbind(serviceTypes.HttpClientService);
//             iocContainer.bind<IHttpClient>(serviceTypes.HttpClientService).toConstantValue(new HttpClientMock());
//         });
//
//         it('should return new address', (done) => {
//             httpMock = iocContainer.get<HttpClientMock>(serviceTypes.HttpClientService);
//             service = iocContainer.get<IAddressService>(serviceTypes.AddressService);
//
//             httpMock.addResponse(BISTOX_GENERATE_ADDRESS, {value: {address: 'address', used: false}});
//
//             const payload: IGetAddressRequest = {
//                 app: 'app',
//                 currency: 'some hash',
//                 erc20: false,
//                 id: '',
//                 ticker: 'eth',
//             };
//
//             service.getAddress(payload)
//                 .then((response) => {
//                     expect(response.address).toBe('address');
//                     expect(response.ticker).toBe(payload.ticker);
//                     done();
//                 })
//                 .catch(done);
//         });
//         it('should not return new address', (done) => {
//             httpMock = iocContainer.get<HttpClientMock>(serviceTypes.HttpClientService);
//             service = iocContainer.get<IAddressService>(serviceTypes.AddressService);
//
//             httpMock.addResponse(BISTOX_GENERATE_ADDRESS, {value: 'incorrect response'});
//
//             const payload: IGetAddressRequest = {
//                 app: 'app',
//                 currency: 'some hash',
//                 erc20: false,
//                 id: '',
//                 ticker: 'eth',
//             };
//
//             service.getAddress(payload)
//                 .then((response) => {
//                     expect(response).toBeUndefined('because of our response from bistox must be crashed');
//                     done();
//                 })
//                 .catch(() => {
//                     done();
//                 });
//         });
//         it('should return existing address', (done) => {
//             httpMock = iocContainer.get<HttpClientMock>(serviceTypes.HttpClientService);
//             service = iocContainer.get<IAddressService>(serviceTypes.AddressService);
//
//             const createdAt = new Date();
//             createdAt.setMinutes(createdAt.getMinutes() - 15);
//             const existingAddress: IAddress = {
//                 address: 'address',
//                 ticker: 'eth',
//                 userId: 'userId',
//                 createdAt,
//             };
//             repository.Repository.create(existingAddress)
//                 .then(() => {
//                     const payload: IGetAddressRequest = {
//                         app: 'app',
//                         currency: 'some hash',
//                         erc20: false,
//                         id: existingAddress.userId,
//                         ticker: existingAddress.ticker,
//                     };
//
//                     service.getAddress(payload)
//                         .then((response: IGetAddressResponse) => {
//                             expect(response.address).toBe(existingAddress.address);
//                             expect(response.ticker).toBe(existingAddress.ticker);
//                             done();
//                         })
//                         .catch(done);
//                 })
//                 .catch(done);
//         });
//     });
// });
