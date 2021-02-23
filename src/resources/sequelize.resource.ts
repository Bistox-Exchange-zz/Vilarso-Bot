import {injectable} from 'inversify';
import {Repository} from 'sequelize-typescript';

@injectable()
export class SequelizeResource<TSource> {
    // tslint:disable-next-line:no-shadowed-variable
    constructor(public readonly Repository: Repository<TSource>) {
    }
}
