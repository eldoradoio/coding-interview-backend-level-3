import { DataSource } from 'typeorm';
import { config } from '../config';
import {BaseDataSourceConfig} from './base.config';

/**
 * Configuración de la fuente de datos (DataSource PostgreSQL) para la conexión a la base de datos A.
 * 
 * @class DataSourceA
 * @extends BaseDataSourceConfig
 * @property {string} host - La dirección del host de la base de datos A.
 * @property {number} port - El puerto en el que la base de datos A está escuchando.
 * @property {string} username - El nombre de usuario para autenticar la conexión en la base de datos A.
 * @property {string} password - La contraseña asociada al usuario de la base de datos A.
 * @property {string} database - El nombre de la base de datos A.
 */
export const AppDataSourceA = new DataSource({
  type: 'postgres',
  host: config.DB_HOST_A,
  port: config.DB_PORT_A,
  username: config.DB_USER_A,
  password: config.DB_PASSWORD_A,
  database: config.DB_NAME_A,
  ...new BaseDataSourceConfig(),  
});

/**
 * Configuración de la fuente de datos (DataSource MariaDB) para la conexión a la base de datos B.
 * 
 * @class DataSourceB
 * @extends BaseDataSourceConfig
 * @property {string} host - La dirección del host de la base de datos B.
 * @property {number} port - El puerto en el que la base de datos B está escuchando.
 * @property {string} username - El nombre de usuario para autenticar la conexión en la base de datos B.
 * @property {string} password - La contraseña asociada al usuario de la base de datos B.
 * @property {string} database - El nombre de la base de datos B.
 */
export const AppDataSourceB = new DataSource({
  type: 'mariadb',
  host: config.DB_HOST_B,
  port: config.DB_PORT_B,
  username: config.DB_USER_B,
  password: config.DB_PASSWORD_B,
  database: config.DB_NAME_B,
  ...new BaseDataSourceConfig(),  
});
