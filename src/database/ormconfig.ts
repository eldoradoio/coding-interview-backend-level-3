import { DataSource } from 'typeorm';
import { Item } from './entities/Items'; 
import { config } from '../config';


/**
 * Clase para la conexión a la base de datos.
 * @class
 * @property {string} type - El tipo de base de datos.
 * @property {string} host - El host de la base de datos.
 * @property {number} port - El puerto de la base de datos.
 * @property {string} username - El usuario de la base de datos.
 * @property {string} password - La contraseña de la base de datos.
 * @property {string} database - El nombre de la base de datos.
 * @property {boolean} synchronize - Sincronizar la base de datos.
 * @property {boolean} logging - Habilitar el logging.
 * @property {Entity[]} entities - Entidades de la base de datos.
 * @property {Migration[]} migrations - Migraciones de la base de datos.
 * @property {Subscriber[]} subscribers - Subscriptores de la base de datos.
 * 
 */
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  synchronize: false, 
  logging: true,
  entities: [Item],  
  migrations: [],
  subscribers: [],
});
