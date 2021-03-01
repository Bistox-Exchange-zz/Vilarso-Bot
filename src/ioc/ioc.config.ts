import {Container} from 'inversify';
import {TradingViewNotificationModel} from '../../sequelizeModels/tradingViewNotification.model';
import {SequelizeResource} from '../resources/sequelize.resource';
import {TradingViewNotificationResource} from '../resources/tradingViewNotification.resource';
import {TYPES as resourceTypes} from '../resources/types';
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
iocContainer
    .bind<SequelizeResource<TradingViewNotificationModel>>(resourceTypes.TradingViewNotificationResource)
    .to(TradingViewNotificationResource);

// Services
iocContainer
    .bind<ITradingViewService>(serviceTypes.TradingViewService)
    .to(TradingViewService);

// Workers
export {iocContainer};
