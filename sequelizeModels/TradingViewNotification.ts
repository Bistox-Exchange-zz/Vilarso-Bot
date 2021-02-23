import {Model, Table} from "sequelize-typescript";

export interface ITradingViewNotification{

}

@Table({
    tableName: 'trading_view_notifications',
})
export class TradingViewNotification extends Model implements ITradingViewNotification {

}
