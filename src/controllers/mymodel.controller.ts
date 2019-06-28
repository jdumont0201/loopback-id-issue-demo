import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Mymodel} from '../models';
import {MymodelRepository} from '../repositories';


export class MymodelController {
  constructor(
    @repository(MymodelRepository)
    public mymodelRepository : MymodelRepository,
  ) {}

  @post('/mymodels', {
    responses: {
      '200': {
        description: 'Mymodel model instance',
        content: {'application/json': {schema: {'x-ts-type': Mymodel}}},
      },
    },
  })
  async create(@requestBody() mymodel: Mymodel): Promise<Mymodel> {
    return await this.mymodelRepository.create(mymodel);
  }

  @get('/mymodels/count', {
    responses: {
      '200': {
        description: 'Mymodel model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Mymodel)) where?: Where<Mymodel>,
  ): Promise<Count> {
    return await this.mymodelRepository.count(where);
  }

  @get('/mymodels', {
    responses: {
      '200': {
        description: 'Array of Mymodel model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Mymodel}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Mymodel)) filter?: Filter<Mymodel>,
  ): Promise<Mymodel[]> {
    return await this.mymodelRepository.find(filter);
  }

  @patch('/mymodels', {
    responses: {
      '200': {
        description: 'Mymodel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() mymodel: Mymodel,
    @param.query.object('where', getWhereSchemaFor(Mymodel)) where?: Where<Mymodel>,
  ): Promise<Count> {
    return await this.mymodelRepository.updateAll(mymodel, where);
  }

  @get('/mymodels/{id}', {
    responses: {
      '200': {
        description: 'Mymodel model instance',
        content: {'application/json': {schema: {'x-ts-type': Mymodel}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Mymodel> {
    return await this.mymodelRepository.findById(id);
  }

  @patch('/mymodels/{id}', {
    responses: {
      '204': {
        description: 'Mymodel PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() mymodel: Mymodel,
  ): Promise<void> {
    await this.mymodelRepository.updateById(id, mymodel);
  }

  @put('/mymodels/{id}', {
    responses: {
      '204': {
        description: 'Mymodel PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mymodel: Mymodel,
  ): Promise<void> {
    await this.mymodelRepository.replaceById(id, mymodel);
  }

  @del('/mymodels/{id}', {
    responses: {
      '204': {
        description: 'Mymodel DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mymodelRepository.deleteById(id);
  }


  @get('/mymodels/test')
async test(
  
): Promise<void> {
  const obj={name:"title"}
  const p:Mymodel=await  this.mymodelRepository.create(obj)
  console.log("Saved entity",p)

  p.name="modified title"
  await this.mymodelRepository.update(p)
  console.log("Modified entity",p)
  return 
}





//patching via route without required fields : works
//compared to 
//patching via REST without required fields : fails
@get('/mymodels/test2')
async test2(): Promise<void> {
  const p=await this.mymodelRepository.findById("5d166cd48639173cc89a1780")
  if(!p || !p.id) return
  const pid:string=p.id

  let patch={
    property:"patched2"
  }
  await this.mymodelRepository.updateById(pid,patch)
  console.log("Modified entity",p)
  return 

}
}
