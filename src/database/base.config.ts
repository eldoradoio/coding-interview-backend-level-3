import { Item } from './entities/Items'; 

/**
 * Clase base para la configuración de las fuentes de datos.
 * Esta clase contiene la configuración compartida entre las bases de datos A y B.
 * 
 * @class BaseDataSourceConfig
 * @property {boolean} synchronize - Indica si TypeORM debe sincronizar automáticamente la estructura de la base de datos.
 * @property {boolean} logging - Habilita o deshabilita los logs de las consultas a la base de datos.
 * @property {Entity[]} entities - Un arreglo con las entidades de la base de datos que TypeORM debe reconocer.
 * @property {Migration[]} migrations - Un arreglo de migraciones para la base de datos.
 * @property {Subscriber[]} subscribers - Un arreglo de suscriptores de eventos de la base de datos.
 */
export class BaseDataSourceConfig {
  public synchronize: boolean = false;
  public logging: boolean = true;
  public entities = [Item];
  public migrations = [];
  public subscribers = [];
}
