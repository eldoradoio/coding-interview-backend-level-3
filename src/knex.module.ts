import { Module, Global } from '@nestjs/common';
import { knex, Knex } from 'knex';
import knexConfig from './knexfile';

const ENV = 'development';

@Global()
@Module({
  providers: [
    {
      provide: 'AWS_POSTGRE',
      useValue: knex(knexConfig[ENV]),
    },
  ],
  exports: ['AWS_POSTGRE'],
})
export class KnexModule {}
