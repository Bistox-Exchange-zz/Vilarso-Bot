import BigNumber from 'bignumber.js';

export class TradeNotificationEntity {

    public title!: string;
    public timeframe: '1H' | '4H' | '1D';
    public mainCurrency: string;
    public quoteCurrency: string;
    public price: BigNumber;
    public side: string;
}
