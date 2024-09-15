import { DataSource } from 'typeorm';
import { Item } from './entities/Items'; 
import { config } from '../config';


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
