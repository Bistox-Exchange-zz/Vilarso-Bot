import {inject, injectable} from "inversify";
import {SequelizeResource} from "./sequelize.resource";
import {TYPES} from "../services/types";
import {SequelizeService} from "../services/sequelize.service";
import {TradingViewNotification} from "../../sequelizeModels/TradingViewNotification";

@injectable()
export class TradingViewNotificationResource extends SequelizeResource<TradingViewNotification> {
    constructor(@inject(TYPES.SequelizeService) public readonly connectionService: SequelizeService) {
        super(connectionService.connection.getRepository(TradingViewNotification));
    }
}
