import {inject, injectable} from 'inversify';
import {SequelizeResource} from './sequelize.resource';
import {TYPES} from '../services/types';
import {SequelizeService} from '../services/sequelize.service';
import {TradingViewNotificationModel} from '../../sequelizeModels/tradingViewNotification.model';

@injectable()
export class TradingViewNotificationResource extends SequelizeResource<TradingViewNotificationModel> {
    constructor(@inject(TYPES.SequelizeService) public readonly connectionService: SequelizeService) {
        super(connectionService.connection.getRepository(TradingViewNotificationModel));
    }
}
