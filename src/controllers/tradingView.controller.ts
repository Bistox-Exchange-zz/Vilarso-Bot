import * as express from 'express';
import {inject} from 'inversify';
import {controller, httpPost, next, requestBody, response} from 'inversify-express-utils';
import {ValidationResult} from 'joi';
import {TradeNotificationEntity} from '../entities/tradingView/tradeNotification.entity';
import {TRADING_VIEW_NOTIFICATION} from '../helper/constant';
import {ITradingViewService} from '../services/tradingView.service';
import {TYPES} from '../services/types';

@controller('/tradingView')
export class AddressController {
    constructor(@inject(TYPES.TradingViewService) private service: ITradingViewService) {
    }

    @httpPost('/notify')
    async notify(
        @response() res: express.Response,
        @requestBody() newNotification: TradeNotificationEntity,
        // tslint:disable-next-line:no-shadowed-variable
        @next() next: express.NextFunction) {

        const joiResult: ValidationResult = newNotification && TRADING_VIEW_NOTIFICATION.validate(newNotification);

        if (joiResult.error || !joiResult.value) {
            console.error('unable to validate payload', joiResult.error);
            return res.status(400).json(joiResult.error);
        }

        await this.service.notify(newNotification).then(() => {
            return res.status(200);
        }).catch(next);
    }
}
