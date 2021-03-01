import {Container} from 'inversify';
import {HttpClientService} from '../services/httpClient.service';
import {SequelizeService} from '../services/sequelize.service';
import {ITradingViewService, TradingViewService} from '../services/tradingView.service';
import {TYPES as serviceTypes} from '../services/types';

const iocContainer = new Container();
// Constants
iocContainer
    .bind<SequelizeService>(serviceTypes.SequelizeService)
    .toConstantValue(new SequelizeService());
iocContainer
    .bind<HttpClientService>(serviceTypes.HttpClientService)
    .toConstantValue(new HttpClientService());

// Repositories

// Services
iocContainer
    .bind<ITradingViewService>(serviceTypes.TradingViewService)
    .to(TradingViewService);

// Workers
export {iocContainer};
