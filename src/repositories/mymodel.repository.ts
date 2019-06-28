import {DefaultCrudRepository} from '@loopback/repository';
import {Mymodel, MymodelRelations} from '../models';
import {MemDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MymodelRepository extends DefaultCrudRepository<
  Mymodel,
  typeof Mymodel.prototype.name,
  MymodelRelations
> {
  constructor(
    @inject('datasources.mem') dataSource: MemDataSource,
  ) {
    super(Mymodel, dataSource);
  }
}
