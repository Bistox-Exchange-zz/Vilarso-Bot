import { injectable } from 'inversify';
import {Sequelize} from 'sequelize-typescript';
import {PG} from '../config';

@injectable()
export class SequelizeService {
    public readonly connection: Sequelize;
    constructor() {
        this.connection = new Sequelize({
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
        });
        this.connection.sync()
            .then(() => console.log('Postgres connected'))
            .catch((error) => console.error('Cannot connect to postgres', error));
    }
}
