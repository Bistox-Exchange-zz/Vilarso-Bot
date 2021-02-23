import {inject, injectable} from "inversify";
import {TYPES} from "../resources/types";
import {TradeNotificationEntity} from "../entities/tradingView/tradeNotification.entity";
import {TradingViewNotificationResource} from "../resources/tradingViewNotification.resource";

export interface ITradingViewService {
    notify(payload: TradeNotificationEntity): Promise<void>;
}

@injectable()
export class TradingViewService implements ITradingViewService {
    constructor(@inject(TYPES.TradingViewNotificationResource) private readonly _repository: TradingViewNotificationResource) {
    }

    async notify(payload: TradeNotificationEntity): Promise<void> {
        try {

            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }


}