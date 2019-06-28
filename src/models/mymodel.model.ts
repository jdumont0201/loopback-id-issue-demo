import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Mymodel extends Entity {
  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
    id: true,
  })
  id?: string;


  constructor(data?: Partial<Mymodel>) {
    super(data);
  }
}

export interface MymodelRelations {
  // describe navigational properties here
}

export type MymodelWithRelations = Mymodel & MymodelRelations;
