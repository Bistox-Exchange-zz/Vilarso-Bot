import BigNumber from 'bignumber.js';
import {
    AllowNull, AutoIncrement,
    Column,
    DataType, Default,
    IsUUID,
    Model,
    PrimaryKey,
    Table, Unique,
} from 'sequelize-typescript';

export interface IWithdrawalRequest {
    user: string;
    app: string;
    autoWithdraw: boolean;
    creation_timestamp: string;
    last_update_timestamp: string;
    address: string;
    currency_ticker: 'eth' | 'ETH' | 'bsx' | 'BSX' | 'btc' | 'BTC';
    transactionHash?: string;
    withdrawal_id?: string;
    amount: BigNumber;
    confirmed: number;
    done: number;
    status?: 'Pending' | 'Finalized' | 'Canceled' | 'Queue';
    isAffiliate: number;
    link_url?: string;
    withdrawNotification: string;
    note?: string;
    fee: BigNumber;
    nonce: BigNumber;
}

@Table({
    tableName: 'withdrawalRequests',
})
export class WithdrawalRequest extends Model implements IWithdrawalRequest {

    @AllowNull(false)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @IsUUID(4)
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column
    user: string;

    @AllowNull(false)
    @Column
    app: string;

    @Default(false)
    @Column
    autoWithdraw: boolean;

    @Column
    creation_timestamp: string;

    @Column
    last_update_timestamp: string;

    @AllowNull(false)
    @Column
    address: string;

    @AllowNull(false)
    @Column
    currency_ticker: 'eth' | 'ETH' | 'bsx' | 'BSX' | 'btc' | 'BTC';

    @Unique
    @Column
    transactionHash?: string;

    @AllowNull(false)
    @Column(DataType.DECIMAL)
    get amount(): BigNumber {
        return new BigNumber(this.getDataValue('amount'));
    }

    @AllowNull(false)
    @Column
    confirmed: number;

    @AllowNull(false)
    @Default(0)
    @Column
    done: number;

    @AllowNull(false)
    @Default('Queue')
    @Column
    status: 'Pending' | 'Finalized' | 'Canceled' | 'Queue';

    @Column
    isAffiliate: number;

    @Column
    link_url?: string;

    @Column
    withdrawNotification: string;

    @Column
    note?: string;

    @AllowNull(false)
    @Column(DataType.DECIMAL)
    get fee(): BigNumber {
        return new BigNumber(this.getDataValue('fee'));
    }

    @Unique
    @Column(DataType.BIGINT)
    get nonce(): BigNumber {
        return new BigNumber(this.getDataValue('nonce'));
    }

    @Unique
    @AutoIncrement
    @Column
    withdrawalId: number;
}
