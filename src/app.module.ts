import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { PingController } from './ping.controller';

@Module({
  imports: [ItemsModule],
  controllers: [PingController],
})
export class AppModule {}
