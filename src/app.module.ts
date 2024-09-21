import { Server } from '@hapi/hapi';
import { ItemsModule } from './modules/items/item.module';

export class AppModule {
  static async registerModules(server: Server) {
    await ItemsModule.register(server);
  }
}