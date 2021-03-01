import * as Joi from 'joi';

export const TRADING_VIEW_NOTIFICATION = Joi.object({
    title: Joi.string().trim().required(),
    timeframe: Joi.string().trim().valid('H1', 'H4', 'D1').required(),
    mainCurrency: Joi.string().trim().required(),
    quoteCurrency: Joi.string().trim().required(),
    price: Joi.string().trim().required(),
    side: Joi.string().trim().valid('Sell', 'Buy').required(),
});
