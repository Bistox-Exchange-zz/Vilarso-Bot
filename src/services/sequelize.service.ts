import { injectable } from 'inversify';
// tslint:disable-next-line:no-implicit-dependencies
import {Sequelize} from 'sequelize-typescript';

@injectable()
export class SequelizeService {
    public readonly connection: Sequelize;
    constructor() {
        /*this.connection = new Sequelize({
            database: PG.database,
            username: PG.username,
            password: PG.password,
            host: PG.host,
            port: Number(PG.port),
            dialect: 'postgres',
            models: [__dirname + '../../../sequelizeModels'],
            repositoryMode: true,
            logging: false,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        });*/
    }
}
