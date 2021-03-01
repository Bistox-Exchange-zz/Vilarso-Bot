import {injectable} from 'inversify';
// tslint:disable-next-line:no-implicit-dependencies
import {Repository} from 'sequelize-typescript';

@injectable()
export class SequelizeResource<TSource> {
    // tslint:disable-next-line:no-shadowed-variable
    constructor(public readonly Repository: Repository<TSource>) {
    }
}
