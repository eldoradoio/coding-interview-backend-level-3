import { Module } from '@nestjs/common';
import { ItemsService } from './item.service';
import { ItemsController } from './items.controller';

@Module({
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
