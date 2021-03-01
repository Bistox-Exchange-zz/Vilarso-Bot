// tslint:disable-next-line:no-implicit-dependencies
import {Model, Table} from 'sequelize-typescript';

// tslint:disable-next-line:no-empty-interface
export interface ITradingViewNotification {

}

@Table({
    tableName: 'trading_view_notifications',
})
export class TradingViewNotificationModel extends Model implements ITradingViewNotification {

}
