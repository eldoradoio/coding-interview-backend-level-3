import { DataSource } from 'typeorm';
import { Item } from './entities/Items'; 
import { config } from '../config';


/**
 * Configuración de la fuente de datos (DataSource) para la conexión a la base de datos.
 * 
 * Esta clase representa la configuración necesaria para establecer la conexión con la base de datos 
 * utilizando TypeORM.
 * 
 * @class AppDataSource
 * @property {string} type - El tipo de base de datos (en este caso, 'postgres').
 * @property {string} host - La dirección del host de la base de datos.
 * @property {number} port - El puerto en el que la base de datos está escuchando.
 * @property {string} username - El nombre de usuario para autenticar la conexión.
 * @property {string} password - La contraseña asociada al usuario de la base de datos.
 * @property {string} database - El nombre de la base de datos.
 * @property {boolean} synchronize - Indica si TypeORM debe sincronizar automáticamente la estructura de la base de datos.
 * @property {boolean} logging - Habilita o deshabilita los logs de las consultas a la base de datos.
 * @property {Entity[]} entities - Un arreglo con las entidades de la base de datos que TypeORM debe reconocer.
 * @property {Migration[]} migrations - Un arreglo de migraciones para la base de datos.
 * @property {Subscriber[]} subscribers - Un arreglo de suscriptores de eventos de la base de datos.
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
