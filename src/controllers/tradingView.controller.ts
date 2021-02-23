import * as express from "express";
import {inject} from 'inversify';
import {controller, httpPost, next, requestBody, response} from 'inversify-express-utils';
import {TYPES} from '../services/types';
import {ITradingViewService} from "../services/tradingView.service";
import {TradeNotificationEntity} from "../entities/tradingView/tradeNotification.entity";

@controller('/tradingView')
export class AddressController {
    constructor(@inject(TYPES.TradingViewService) private service: ITradingViewService) {
    }

    @httpPost('/notify')
    async notify(
        @response() res: express.Response,
        @requestBody() newNotification: TradeNotificationEntity,
        @next() next: express.NextFunction) {

        await this.service.notify(newNotification).then(() => {
            return res.status(200);
        }).catch(next)
    }
}
