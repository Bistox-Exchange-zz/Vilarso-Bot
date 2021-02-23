import {Container} from 'inversify';
import {SequelizeResource} from '../resources/sequelize.resource';
import {TYPES as resourceTypes} from '../resources/types';
import {HttpClientService} from '../services/httpClient.service';
import {SequelizeService} from '../services/sequelize.service';
import {TYPES as serviceTypes} from '../services/types';
import {TradingViewNotification} from "../../sequelizeModels/TradingViewNotification";
import {TradingViewNotificationResource} from "../resources/tradingViewNotification.resource";
import {ITradingViewService, TradingViewService} from "../services/tradingView.service";

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
    .bind<SequelizeResource<TradingViewNotification>>(resourceTypes.TradingViewNotificationResource)
    .to(TradingViewNotificationResource);

// Services
iocContainer
    .bind<ITradingViewService>(serviceTypes.TradingViewService)
    .to(TradingViewService);

// Workers
export {iocContainer};
