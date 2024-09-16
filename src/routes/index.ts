import { Server } from '@hapi/hapi';
import { itemRoutes } from './item.routes';


export const registerRoutes = (server: Server) => {
  itemRoutes(server);  // Registra las rutas de items
};