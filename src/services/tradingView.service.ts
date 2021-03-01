import {injectable} from 'inversify';
import {TradeNotificationEntity} from '../entities/tradingView/tradeNotification.entity';

export interface ITradingViewService {
    notify(payload: TradeNotificationEntity): Promise<void>;
}

@injectable()
export class TradingViewService implements ITradingViewService {
    constructor() {
    }

    async notify(payload: TradeNotificationEntity): Promise<void> {
        try {
            console.log(payload);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }
}
