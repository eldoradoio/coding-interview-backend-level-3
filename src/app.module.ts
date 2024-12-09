import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { PingController } from './ping.controller';
import { KnexModule } from './knex.module';

@Module({
  imports: [KnexModule, ItemsModule],
  controllers: [PingController],
})
export class AppModule {}
